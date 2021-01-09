import { APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import { User } from 'entities/User';
import AuthService from 'services/Auth';

export interface CustomContext {
  event: APIGatewayProxyEvent;
  context: LambdaContext;
  user?: User;
}

// createCustomContext checks for a JWT Access Token in the requests's
// Authorization Header. If there is a token and it's valid, this function sets
// the user on context.
export const createCustomContext = (
  event: APIGatewayProxyEvent,
  context: LambdaContext
): CustomContext => {
  let user: User | undefined;
  const authHeader = event.headers['Authorization'];
  if (authHeader) {
    const headerParts = authHeader.split('Bearer ');
    if (headerParts.length === 2) {
      const token = headerParts[1];
      const userFromToken = AuthService.extractUserFromJwtAccessToken(token);
      if (userFromToken) {
        user = userFromToken;
      }
    }
  }
  console.log('createCustomContext with user: ', user);
  return {
    event,
    context,
    user,
  };
};
