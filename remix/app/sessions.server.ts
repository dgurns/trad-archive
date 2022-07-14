import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage({
		cookie: {
			name: "jwt",
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 30, // 30 days
			path: "/",
			sameSite: "none",
			secure: true,
			secrets: [process.env.JWT_SECRET_KEY ?? "jwt_secret_key"],
		},
	});

export { getSession, commitSession, destroySession };
