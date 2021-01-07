import { AuthChecker } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-lambda';
import { User, UserPermission } from 'entities/User';
import { CustomContext } from 'context';

// authenticateRequest checks the incoming request context for a valid user. If
// no valid user is found, it returns an AuthenticationError.
export const authenticateRequest = (
  ctx: CustomContext
): AuthenticationError | void => {
  if (!ctx.user) {
    return new AuthenticationError('Request must contain a valid user');
  }
};

// authChecker is run whenever a resolver is protected by the `@Authorized`
// decorator. It returns a boolean for whether the request is authorized.
export const authChecker: AuthChecker<CustomContext> = (
  { root, context },
  requiredRoles
) => {
  const { user } = context;

  // If there is no user in context, the request is not authorized
  if (!user) {
    return false;
  }
  // If user is an Admin, give access to everything
  if (user.permissions.includes(UserPermission.Admin)) {
    return true;
  }
  // If the auth requires Admin, return user's admin status
  if (requiredRoles.includes(UserPermission.Admin)) {
    return user.permissions.includes(UserPermission.Admin);
  }
  // Otherwise, only return entities associated with current user
  // For now, we're only checking User entities
  if (root instanceof User) {
    return root.id === user.id;
  }

  return false;
};
