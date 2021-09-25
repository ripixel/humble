import fs from 'fs';
import findInDir from '../findInDir';
import logger from '../logger';

interface Config {
  rootDir?: string;
  pagesDir?: string;
  partialsDir?: string;
  outDir?: string;
  values?: string;
}

const DEFAULTS: Config = {
  rootDir: './',
  pagesDir: 'pages',
  partialsDir: 'partials',
  outDir: 'public',
};

const getConfig = (path?: string): Config => {
  if (path) {
    let configFile: string;
    try {
      configFile = fs.readFileSync(path, 'utf8');
    } catch (e) {
      throw new Error(
        'Config file path provided, but could not find config file at specific location'
      );
    }

    let configParsed: Config;

    try {
      configParsed = JSON.parse(configFile);
    } catch (e) {
      throw new Error('Config file found, but is invalid JSON');
    }

    logger.info('☑ Config file loaded');
    return { ...DEFAULTS, ...configParsed };
  } else {
    const files = findInDir('./', 'humble.config.json');

    if (files.length === 0) {
      logger.warn(
        'No config file found or provided - using default configuration'
      );
      return DEFAULTS;
    }

    let configFile: string;
    try {
      configFile = fs.readFileSync(files[0], 'utf8');
    } catch (e) {
      throw new Error('Config file found, but could not load (CRITICAL ERROR)');
    }

    let configParsed: Config;

    try {
      configParsed = JSON.parse(configFile);
    } catch (e) {
      throw new Error('Config file found, but is invalid JSON');
    }

    logger.info('☑ Config file loaded');
    return { ...DEFAULTS, ...configParsed };
  }
};

export default getConfig;
