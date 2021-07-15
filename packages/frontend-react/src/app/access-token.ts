// stores inMemory accessToken
let accessToken: string = '';

export const getAccessToken = () => {
  return accessToken;
}
export const setAccessToken = (token: string) => {
  accessToken = token;
}