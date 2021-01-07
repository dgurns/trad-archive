import { APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import { User } from 'entities/User';

export interface CustomContext {
  event: APIGatewayProxyEvent;
  context: LambdaContext;
  user: User | null;
}

export const createCustomContext = (
  event: APIGatewayProxyEvent,
  context: LambdaContext
): CustomContext => {
  const user: User | null = null;
  const authHeader = event.headers['Authorization'];
  if (authHeader) {
    // Validate token and fetch user
    // Set user on context
  }
  return {
    event,
    context,
    user,
  };
};
