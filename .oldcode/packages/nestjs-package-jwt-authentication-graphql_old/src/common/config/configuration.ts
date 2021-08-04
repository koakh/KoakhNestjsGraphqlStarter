import { EnvironmentVariables } from "../../auth/interfaces";

export const configuration = (): EnvironmentVariables => ({
  // jwt
  // https://github.com/zeit/ms
  // https://github.com/auth0/node-jsonwebtoken#usage
  accessTokenJwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secretKeyAccessToken',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenJwtSecret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secretKeyRefreshToken',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  refreshTokenSkipIncrementVersion: !process.env.REFRESH_TOKEN_SKIP_INCREMENT_VERSION || process.env.REFRESH_TOKEN_SKIP_INCREMENT_VERSION === 'false' ? false : true,
});
