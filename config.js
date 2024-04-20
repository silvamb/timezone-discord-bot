import pino from 'pino';

const logger = pino();

export const DEFAULT_TIMEZONE = 'UTC';
export const DEFAULT_FORMAT = 'ddd h:mmA';

export class ServerConfig {
  constructor(
    serverId,
    timezone = DEFAULT_TIMEZONE,
    dateFormat = DEFAULT_FORMAT,
  ) {
    this.timezone = timezone;
    this.serverId = serverId;
    this.dateFormat = dateFormat;
  }
}

export class InMemoryCache {
  constructor() {
    this.cache = new Map();
  }

  find(serverId) {
    logger.debug({ serverId }, 'looking for server in cache');
    return this.cache.get(serverId);
  }

  save(server = new ServerConfig()) {
    logger.info({ server }, 'saving server configuration in memory');
    this.cache.set(server.serverId, server);
  }

  findAll() {
    return this.cache.values();
  }
}

export const cache = new InMemoryCache();
