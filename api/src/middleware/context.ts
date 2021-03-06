import cookie from 'cookie';
import { APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import AuthService, { JwtCookie } from 'services/Auth';
export interface CustomContext {
  event: APIGatewayProxyEvent;
  context: LambdaContext;
  userId?: string;
  setResponseJwtCookie?: JwtCookie;
}

// createCustomContext checks for a JWT Access Token in the requests's
// Authorization Header. If there is a token and it's valid, this function sets
// the user on context.
export const createCustomContext = (
  event: APIGatewayProxyEvent,
  context: LambdaContext
): CustomContext => {
  let userId: string | undefined;
  let setResponseJwtCookie: JwtCookie | undefined;

  console.log('HEADERS', event.headers);
  const requestCookie = event.headers['Cookie'] ?? event.headers['cookie'];
  console.log('COOKIE', requestCookie);
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
    event,
    context,
    userId,
    setResponseJwtCookie,
  };
};
