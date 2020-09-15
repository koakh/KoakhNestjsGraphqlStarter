export default interface JwtValidatePayload {
  username: string;
  sub: string;
  roles: string[];
  exp: number;
  iat: number;
}
