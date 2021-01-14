import cookie from 'cookie';
import { APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import AuthService, { JwtCookie, COOKIE_NAME } from 'services/Auth';
export interface CustomContext {
  event: APIGatewayProxyEvent;
  context: LambdaContext;
  userId?: number;
  setResponseJwtCookie?: JwtCookie;
}

// createCustomContext checks for a JWT Access Token in the requests's
// Authorization Header. If there is a token and it's valid, this function sets
// the user on context.
export const createCustomContext = (
  event: APIGatewayProxyEvent,
  context: LambdaContext
): CustomContext => {
  let userId: number | undefined;
  let setResponseJwtCookie: JwtCookie | undefined;

  const requestCookie = event.headers['Cookie'];
  if (requestCookie) {
    const parsedCookie = cookie.parse(requestCookie);
    const userIdFromCookie = AuthService.extractUserIdFromJwt(
      parsedCookie[COOKIE_NAME]
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
    event,
    context,
    userId,
    setResponseJwtCookie,
  };
};
