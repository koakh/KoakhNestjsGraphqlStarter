// tslint:disable-next-line:no-var-requires
export const envVariables: any = {
  // http/s server
  // httpPort: process.env.HTTP_SERVER_PORT || 3001,
  httpsPort: process.env.HTTPS_SERVER_PORT || 3443,
  httpsKeyFile: process.env.HTTPS_KEY_FILE || 'config/server.key',
  httpsCertFile: process.env.HTTPS_CERT_FILE || 'config/server.crt',

  // jwt
  // https://github.com/zeit/ms
  // https://github.com/auth0/node-jsonwebtoken#usage
  accessTokenJwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secretKeyAccessToken',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenJwtSecret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secretKeyRefreshToken',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  refreshTokenSkipIncrementVersion: process.env.REFRESH_TOKEN_SKIP_INCREMENT_VERSION || 'false',

  // cors origin react frontend, split to array, used in cors graphql and cors rest
  corsOriginReactFrontend: (process.env.CORS_ORIGIN_REACT_FRONTEND) ? process.env.CORS_ORIGIN_REACT_FRONTEND.split(',') : ['https://localhost:3000'],
};
