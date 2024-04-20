import { REST } from 'discord.js';
import { Routes } from 'discord.js';
import pino from 'pino';

import { TIME_COMMAND } from './commands.js';
import { applicationId, token } from './env.js';

const logger = pino();

const rest = new REST().setToken(token);

(async () => {
  try {
    logger.info('started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(applicationId), {
      body: [TIME_COMMAND.toJSON()],
    });

    logger.info('successfully reloaded application (/) commands.');
  } catch (error) {
    logger.error(error, 'failed to refresh commands');
  }
})();
