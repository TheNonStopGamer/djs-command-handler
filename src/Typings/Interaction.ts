import { Snowflake, Permissions, UserFlags } from 'discord.js';

export interface Interaction {
  id: Snowflake,
  type: InteractionType,
  data?: ApplicationCommandInteractionData,
  guild_id: Snowflake,
  channel_id: Snowflake,
  member: InteractionMember,
  token: string,
  readonly version: number,
}

export interface InteractionMember {
  user: InteractionUser,
  roles: Snowflake[],
  premium_since: Date | null,
  readonly permissions: Permissions,
  pending: boolean,
  nick: string | null,
  mute: boolean,
  joined_at: Date,
  is_pending: boolean,
  deaf: boolean
}

export interface InteractionUser {
  id: Snowflake,
  username: string,
  avatar: string,
  discriminator: string,
  public_flags: UserFlags
}

export enum InteractionType {
  Ping = 1,
  ApplicationCommand = 2
}

export interface ApplicationCommandInteractionData {
  id: Snowflake,
  name: string,
  options?: ApplicationCommandInteractionDataOption[]
}

export interface ApplicationCommandInteractionDataOption {
  name: string,
  value?: string,
  options?: ApplicationCommandInteractionDataOption[]
}
