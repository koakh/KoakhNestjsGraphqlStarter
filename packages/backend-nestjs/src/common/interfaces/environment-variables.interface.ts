export interface EnvironmentVariables {
  // app
  logger: string;
  // server: {
  httpsServerPort: number;
  httpsKeyFile: string;
  httpsCertFile: string;
  refreshTokenSkipIncrementVersion: boolean;
  corsOriginEnabled: boolean;
  corsOriginReactFrontend: string;
  // },
  // jwt: {
  //   accessTokenJwtSecret: string,
  //   accessTokenExpiresIn: string,
  //   refreshTokenJwtSecret: string,
  //   refreshTokenExpiresIn: string,
  //   refreshTokenSkipIncrementVersion: boolean,
  // },
}