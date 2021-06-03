import { URLSearchParams } from "url";
import jwt from "jsonwebtoken";
import { CookieSerializeOptions } from "cookie";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import addDays from "date-fns/addDays";
import subYears from "date-fns/subYears";
import addMinutes from "date-fns/addMinutes";

import { User } from "models/User";

const { SERVERLESS_STAGE, WEB_ORIGIN } = process.env;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "my-jwt-secret-key";

const isValidEmail = (email?: string) => {
	if (!email) return false;

	const validityRegex = new RegExp(
		/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	);
	return validityRegex.test(email);
};

type AutoLoginToken = {
	tokenUnhashed: string;
	tokenHashed: string;
	tokenExpiry: Date;
};
const createAutoLoginToken = async (): Promise<AutoLoginToken> => {
	const tokenUnhashed = uuid();
	const tokenHashed = await bcrypt.hash(tokenUnhashed, 10);
	const tokenExpiry = addMinutes(new Date(), 10);
	return {
		tokenUnhashed,
		tokenHashed,
		tokenExpiry,
	};
};

const makeInvalidAutoLoginTokenExpiry = () => {
	return subYears(new Date(), 1);
};

interface MakeAutoLoginUrlArgs {
	autoLoginTokenUnhashed: string;
	redirectTo?: string;
}
const makeAutoLoginUrl = ({
	autoLoginTokenUnhashed,
	redirectTo,
}: MakeAutoLoginUrlArgs) => {
	const params = new URLSearchParams({
		tokenUnhashed: autoLoginTokenUnhashed,
	});
	if (redirectTo) {
		params.set("redirectTo", redirectTo);
	}
	return `${WEB_ORIGIN}/auto-login?${params.toString()}`;
};

const createJwt = (user: User) => {
	const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
	return token;
};

type JwtPayload = {
	userId: string;
};

const extractUserIdFromJwt = (token: string): string | undefined => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET_KEY);
		if (!decoded || typeof decoded !== "object") {
			throw new Error();
		}
		const payload = decoded as JwtPayload;
		return payload.userId;
	} catch {
		return undefined;
	}
};
export interface JwtCookie {
	name: string;
	value: string;
	options: CookieSerializeOptions;
}

const COOKIE_NAME = "jwt";

const makeJwtCookie = (token: string, expirationDate: Date): JwtCookie => {
	let sameSite: "none" | "lax" | "strict" = "none";
	if (SERVERLESS_STAGE === "dev") {
		sameSite = "lax";
	} else if (SERVERLESS_STAGE === "prod") {
		sameSite = "strict";
	}
	return {
		name: COOKIE_NAME,
		value: token,
		options: {
			path: "/",
			expires: expirationDate,
			httpOnly: true,
			sameSite,
			secure: SERVERLESS_STAGE === "dev" ? false : true,
		},
	};
};

const makeValidJwtCookie = (token: string): JwtCookie => {
	const validExpirationDate = addDays(new Date(), 30);
	return makeJwtCookie(token, validExpirationDate);
};

const makeInvalidJwtCookie = (): JwtCookie => {
	const invalidExpirationDate = subYears(new Date(), 1);
	return makeJwtCookie("", invalidExpirationDate);
};

export default {
	isValidEmail,
	createAutoLoginToken,
	makeInvalidAutoLoginTokenExpiry,
	makeAutoLoginUrl,
	createJwt,
	extractUserIdFromJwt,
	COOKIE_NAME,
	makeValidJwtCookie,
	makeInvalidJwtCookie,
};
