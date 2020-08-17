export const envVariables: any = {
  // http/s server
  httpsPort: process.env.HTTPS_SERVER_PORT || 443,
  httpsKeyFile: process.env.HTTPS_KEY_FILE || 'config/server.key',
  httpsCertFile: process.env.HTTPS_CERT_FILE || 'config/server.crt',
  // jwt
  accessTokenJwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secretKeyAccessToken',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenJwtSecret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secretKeyRefreshToken',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  refreshTokenSkipIncrementVersion: process.env.REFRESH_TOKEN_SKIP_INCREMENT_VERSION || 'false',
  // cors origin react frontend
  corsOriginReactFrontend: process.env.CORS_ORIGIN_REACT_FRONTEND || 'https://localhost:3000',
};
