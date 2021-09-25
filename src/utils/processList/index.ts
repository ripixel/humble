import logger from '../logger';

export interface ListItem {
  title: string;
  description?: string;
  task: (() => void) | (() => Promise<void>);
}

const processList = async (list: ListItem[]): Promise<void> => {
  const processNext = async (index: number): Promise<void> => {
    if (index === list.length) {
      logger.successBold('✔ Done');
      return;
    }

    const item = list[index];

    logger.infoBold(`▶ ${item.title}`);
    if (item.description) {
      logger.info(`  ${item.description}`);
    }

    await item.task();

    return processNext(index + 1);
  };

  if (list.length === 0) {
    logger.failBold('❌ No items to process');
  }

  logger.successBold('▶ Starting');

  try {
    await processNext(0);
  } catch (error: unknown) {
    logger.failBold('❌ Error occurred while processing:');
    logger.error(error as Error);
  }
};

export default processList;
