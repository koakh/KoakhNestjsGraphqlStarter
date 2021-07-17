import * as fs from 'fs';
import { configuration } from '../../common/config';

export const httpsOptions = {
  // private-key.pem
  key: fs.readFileSync(`./${configuration().server.httpsKeyFile}`),
  // public-certificate.pem
  cert: fs.readFileSync(`./${configuration().server.httpsCertFile}`),
};
