import { GraphQLRequestContext } from "apollo-server-plugin-base";
import cookie from "cookie";
import { JwtCookie } from "../services/Auth";

// This plugin checks to see if a response JWT cookie should be set. If so,
// it sets the cookie on the response.
const responseJwtCookiePlugin = {
	requestDidStart() {
		return {
			willSendResponse(requestContext: GraphQLRequestContext) {
				const { setResponseJwtCookie } = requestContext.context;

				if (setResponseJwtCookie) {
					const { name, value, options } = setResponseJwtCookie as JwtCookie;
					const cookieString = cookie.serialize(name, value, options);

					requestContext.response?.http?.headers.set(
						"Set-Cookie",
						cookieString
					);
				}

				return requestContext;
			},
		};
	},
};

module.exports = [responseJwtCookiePlugin];
