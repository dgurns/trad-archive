import { AuthChecker } from 'type-graphql';
import { User, UserPermission } from 'models/User';
import { CustomContext } from 'middleware/context';

// authChecker is run whenever a resolver is protected by the `@Authorized`
// decorator. It returns a boolean for whether the request is authorized.
export const authChecker: AuthChecker<CustomContext> = async (
  { root, context },
  requiredRoles
) => {
  const { userId } = context;
  const user = await User.findOne({ where: { id: userId } });

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
