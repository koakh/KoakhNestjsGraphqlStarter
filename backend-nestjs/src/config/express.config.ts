// node module
import * as fs from 'fs';
import { getEnvVariables as e } from '../common/env';

export const httpsOptions = {
  // private-key.pem
  key: fs.readFileSync(`./${e().httpsKeyFile}`),
  // public-certificate.pem
  cert: fs.readFileSync(`./${e().httpsCertFile}`),
};
