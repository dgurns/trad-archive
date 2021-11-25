import cookie from "cookie";
import { APIGatewayProxyEvent } from "aws-lambda";
import AuthService, { JwtCookie } from "../services/Auth";

export interface CustomContext {
	userId?: string;
	setResponseJwtCookie?: JwtCookie;
}

// createCustomContext checks for a JWT Access Token in the requests's
// Authorization Header. If there is a token and it's valid, this function sets
// the user on context. In a serverless Lambda environment, `event` will be
// passed as an arg; in a persistent Node environment, `req` will be passed.
interface Args {
	event?: APIGatewayProxyEvent;
	req?: {
		rawHeaders: string[];
	};
}
export const createCustomContext = ({ event, req }: Args): CustomContext => {
	let userId: string | undefined;
	let setResponseJwtCookie: JwtCookie | undefined;

	let requestCookie: string | undefined;
	if (event) {
		requestCookie = event.headers["Cookie"] ?? event.headers["cookie"];
	} else if (req) {
		const cookieHeaderIndex = req.rawHeaders.findIndex(
			(item) => item.toLowerCase() === "cookie"
		);
		if (cookieHeaderIndex >= 0) {
			requestCookie = req.rawHeaders[cookieHeaderIndex + 1];
		}
	}

	if (requestCookie) {
		const parsedCookie = cookie.parse(requestCookie);
		const userIdFromCookie = AuthService.extractUserIdFromJwt(
			parsedCookie[AuthService.COOKIE_NAME]
		);
		if (userIdFromCookie) {
			userId = userIdFromCookie;
		} else {
			// There was an auth token but no valid userId could be extracted, so
			// set the response cookie to an `expires` date in the past
			setResponseJwtCookie = AuthService.makeInvalidJwtCookie();
		}
	}

	return {
		userId,
		setResponseJwtCookie,
	};
};
