// node module
import * as fs from 'fs';
import { envVariables as e } from '../config/';

export const httpsOptions = {
  // private-key.pem
  key: fs.readFileSync(`./${e.httpsKeyFile}`),
  // public-certificate.pem
  cert: fs.readFileSync(`./${e.httpsCertFile}`),
};
