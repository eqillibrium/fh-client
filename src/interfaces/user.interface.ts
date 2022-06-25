export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  passwordHash?: string;
  token?: string;
  isAdmin?: boolean;
}
