import { User, UserPermission } from 'types';

const isAdmin = (user?: User) => {
  if (!user) return false;

  const { permissions } = user;
  return Object.values(permissions).includes('Admin' as UserPermission);
};

const UserService = {
  isAdmin,
};
export default UserService;
