import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import humble from './humble';

const argv = yargs(hideBin(process.argv)).argv as {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

humble(argv.config as string | undefined);
