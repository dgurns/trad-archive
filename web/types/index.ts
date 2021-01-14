export enum UserPermission {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface User {
  id: number;
  permissions: UserPermission[];
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
