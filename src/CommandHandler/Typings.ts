import { Snowflake, Guild, Channel, GuildMember } from 'discord.js';
import { Command } from '../Command/Command';

export interface CommandHandlerOptions {
  devRole?: Snowflake,
  prefix?: string
}

export interface CommandEvent {
  slashCommand: [/*parsed stuffs, */Command, Guild, Channel, GuildMember],
  command: [/*parsed stuffs, */Command, Guild, Channel, GuildMember]
  deniedPerm: [/*parsed stuffs, */Command, Guild, Channel, GuildMember],
  deprecatedCommand: [/*parsed stuffs, */Guild, Channel, GuildMember]
}

