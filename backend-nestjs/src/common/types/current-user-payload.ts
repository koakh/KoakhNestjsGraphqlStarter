/**
 * used as CurrentUserPayload and used as type for sign auth token payload
 */
export default interface CurrentUserPayload {
  userId: string;
  username: string;
  roles: string[];
}
