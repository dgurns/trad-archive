export enum UserPermission {
  User = 'USER',
  Admin = 'ADMIN',
}

export class User {
  id: string;
  permissions: UserPermission[];
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export class Item {
  id: string;
  title: string | null;
  description: string | null;
  addedByUserId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AudioItem extends Item {
  urlSource: string;
  urlMp3: string | null;
}
