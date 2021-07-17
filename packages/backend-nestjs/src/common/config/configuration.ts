export const configuration = () => ({
  server: {
    httpsServerPort: parseInt(process.env.HTTPS_SERVER_PORT, 10) || 3443,
    httpsKeyFile: process.env.HTTPS_KEY_FILE || 'config/privkey.pem',
    httpsCertFile: process.env.HTTPS_CERT_FILE || 'config/fullchain.pem',
    // cors origin react frontend, split to array, used in cors graphql and cors rest
    refreshTokenSkipIncrementVersion: (process.env.REFRESH_TOKEN_SKIP_INCREMENT_VERSION as unknown as boolean) || false,
    // corsOriginEnabled: process.env.CORS_ORIGIN_ENABLED ? process.env.CORS_ORIGIN_ENABLED as unknown as boolean : true,
    corsOriginEnabled: process.env.CORS_ORIGIN_ENABLED === 'true' ? true : false,
    corsOriginReactFrontend: process.env.CORS_ORIGIN_REACT_FRONTEND || 'https://localhost:3000',
  },
  jwt: {
    // jwt
    // https://github.com/zeit/ms
    // https://github.com/auth0/node-jsonwebtoken#usage
    accessTokenJwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secretKeyAccessToken',
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    refreshTokenJwtSecret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secretKeyRefreshToken',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    refreshTokenSkipIncrementVersion: process.env.REFRESH_TOKEN_SKIP_INCREMENT_VERSION === 'true' ? true : false,
  },
});
