import chalk from 'chalk';

export default {
  success: (message: string): void => console.log(chalk.green(message)),
  successBold: (message: string): void =>
    console.log(chalk.bold.green(message)),
  fail: (message: string): void => console.log(chalk.red(message)),
  failBold: (message: string): void => console.log(chalk.bold.red(message)),
  error: (error: Error): void => console.error(chalk.red(error)),
  info: (message: string): void => console.log(chalk.blue(message)),
  infoBold: (message: string): void => console.log(chalk.bold.blue(message)),
  warn: (message: string): void => console.log(chalk.yellow(message)),
  warnBold: (message: string): void => console.log(chalk.bold.yellow(message)),
  log: (message: string): void => console.log(chalk.white(message)),
  logBold: (message: string): void => console.log(chalk.bold.white(message)),
};
