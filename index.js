import { CronJob } from 'cron';
import { Client, GatewayIntentBits } from 'discord.js';
import moment from 'moment-timezone';
import pino from 'pino';

import { TIME_COMMAND, TIMEZONE_OPTION } from './commands.js';
import {
  DEFAULT_FORMAT,
  DEFAULT_TIMEZONE,
  ServerConfig,
  cache,
} from './config.js';
import { token } from './env.js';

const logger = pino();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  logger.info({ tag: client.user.tag }, 'logged in');

  refreshTime().then(startCron);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === TIME_COMMAND.name) {
    await handleTime(interaction);
  }
});

async function handleTime(interaction) {
  const timezone =
    interaction.options.getString(TIMEZONE_OPTION) ?? DEFAULT_TIMEZONE;

  logger.info({ timezone }, 'running time command');

  if (!moment.tz.zone(timezone)) {
    logger.warn({ timezone }, 'invalid timezone provided');
    return interaction.reply({
      content: `Timezone does not exist: ${timezone}, please provide a valid time zone`,
      ephemeral: true,
    });
  }

  logger.info('fetching bot member from server');
  const user = await interaction.guild.members.fetchMe();

  await changeNickname(user, timezone);

  cache.save(new ServerConfig(interaction.guild.id, timezone));

  return interaction.reply({
    content: `Bot now configured to use ${timezone} timezone`,
    ephemeral: true,
  });
}

async function changeNickname(user, timezone, format = DEFAULT_FORMAT) {
  const time = moment().tz(timezone).format(format);

  return user.setNickname(time.toUpperCase());
}

async function refreshTime() {
  logger.debug('starting refresh time');

  client.guilds.cache.each(async (guild) => {
    logger.debug(
      {
        id: guild.id,
        name: guild.name,
      },
      'found server in cache, fetching bot user',
    );
    const botUser = await guild.members.fetchMe();

    const serverConfig = cache.find(guild.id);
    if (!serverConfig) {
      logger.info({ name: guild.name }, 'server not configured yet');
      return botUser.setNickname('Not configured');
    }

    logger.debug({ serverConfig }, 'found server config in cache');

    return changeNickname(botUser, serverConfig.timezone);
  });
}

function startCron(cron = '0 * * * * *') {
  logger.info({ cron }, 'starting cron job');

  const job = new CronJob(cron, refreshTime, null, false, 'UTC');

  job.start();
  logger.info('job scheduled for the first time at %s', job.nextDate());
}

logger.info('connecting to Discord');
client.login(token);
