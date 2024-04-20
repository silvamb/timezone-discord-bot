import 'dotenv/config'
import process from 'node:process';

if (!process.env.DISCORD_TOKEN) {
  throw new Error('The DISCORD_TOKEN environment variable is required.');
}
if (!process.env.DISCORD_APPLICATION_ID) {
  throw new Error(
    'The DISCORD_APPLICATION_ID environment variable is required.',
  );
}

export const token = process.env.DISCORD_TOKEN;
export const applicationId = process.env.DISCORD_APPLICATION_ID;
