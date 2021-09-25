import getConfig from './utils/getConfig';
import logger from './utils/logger';

const humble = (configPath?: string): void => {
  try {
    const config = getConfig(configPath);

    logger.info(JSON.stringify(config, null, 4));
  } catch (e) {
    logger.failBold('❌ Error occurred:');
    logger.error(e as Error);
  }
};

export default humble;
