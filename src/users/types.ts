export enum UserRoles {
  User = "USER",
  Admin = "ADMIN"
}

export type UserData = {
  id: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  roles: string[],
  createdDate: number,
  metaData: Object,
}