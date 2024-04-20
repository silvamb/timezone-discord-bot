/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export const TIMEZONE_OPTION = 'timezone';

export const TIME_COMMAND = new SlashCommandBuilder()
  .setName('time')
  .setDescription('Configures the timezone to set the nickname')
  .addStringOption(
    new SlashCommandStringOption()
      .setName(TIMEZONE_OPTION)
      .setDescription(
        'The timezone identifier, for example, Europe/Berlin. Default is UTC.',
      )
      .setRequired(false),
  )
  .setDefaultMemberPermissions(
    PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild,
  )


 export const commands = new Map([
  ['time', TIME_COMMAND]
 ])
