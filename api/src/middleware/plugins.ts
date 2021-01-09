import { GraphQLRequestContext } from 'apollo-server-plugin-base';
import cookie from 'cookie';
import { ResponseAuthCookie } from 'middleware/cookie';

// This plugin checks to see if a response auth cookie should be set. If so,
// it sets the cookie on the response.
const responseAuthCookiePlugin = {
  requestDidStart() {
    return {
      willSendResponse(requestContext: GraphQLRequestContext) {
        const { setResponseAuthCookie } = requestContext.context;

        if (setResponseAuthCookie) {
          const {
            name,
            value,
            options,
          } = setResponseAuthCookie as ResponseAuthCookie;

          const cookieString = cookie.serialize(name, value, options);
          requestContext.response?.http?.headers.set(
            'Set-Cookie',
            cookieString
          );
        }

        return requestContext;
      },
    };
  },
};

module.exports = [responseAuthCookiePlugin];
