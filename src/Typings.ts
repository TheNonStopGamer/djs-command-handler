import { Snowflake } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/ban-types
export type StringUnion<Literal extends string> = Literal | (string & {});

export type Category = StringUnion<'General' | 'Fun' | 'Economy' | 'Moderation' | 'Misc'>;

export type Tag = StringUnion<'Global' | 'Beta' | 'Alpha' | 'Testing' | 'Dev' | 'Scoped' | 'Guild'>;

export type RunFunc = (...args: unknown[]) => unknown;

declare module 'discord.js' {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	interface Client {
		readonly api: {
			readonly interactions: (id: Snowflake, token: string) => {
				readonly callback: {
					readonly post: (responseData: InteractionResponseData) => never;
				}
			},
			readonly applications: (id: Snowflake) => {
				guilds: (id: Snowflake) => {
					commands: {
						get: () => Promise<Array<SlashCommand>>,
						post: (command: SlashCommand) => void;
					} & ((id: Snowflake) => { delete: () => void })
				}
				commands: {
					get: () => Promise<Array<SlashCommand>>,
					post: (command: SlashCommand) => void;
				} & ((id: Snowflake) => { delete: () => void })
			}
		}
	}
}

export type ISO8601 = string;

export interface SlashCommand {
	id: Snowflake,
	application_id: Snowflake,
	name: string,
	description: string,
	options?: SlashCommandOption[],
	default_permission?: boolean
}

export interface SlashCommandOption {
	type: SlashCommandOptionType,
	name: string,
	description: string,
	required?: boolean,
	choices?: SlashCommandOptionChoice[],
	options?: SlashCommandOption
}

export enum SlashCommandOptionType {
	SUB_COMMAND = 1,
	SUB_COMMAND_GROUP = 2,
	STRING = 3,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	ROLE = 8
}

export interface SlashCommandOptionChoice<T extends string | number = string | number> {
	name: string,
	value: T
}

export interface GuildSlashCommandPermissions {
	id: Snowflake,
	application_id: Snowflake,
	guild_id: Snowflake,
	permissions: SlashCommandPermissions[]
}

export interface SlashCommandPermissions {
	id: Snowflake,
	type: SlashCommandPermissionType,
	permission: boolean
}

export enum SlashCommandPermissionType {
	ROLE = 1,
	USER = 2
}

export interface Interaction {
	id: Snowflake,
	application_id: Snowflake,
	type: InteractionType,
	data: SlashCommandInteractionData,
	guild_id: Snowflake,
	channel_id: Snowflake,
	member?: GuildMemberStructure
}

export enum InteractionType {
	Ping = 1,
	ApplicationCommand = 2
}

export interface SlashCommandInteractionData {
	id: Snowflake,
	name: string,
	resolved?: SlashCommandInteractionDataResolved,
	options?: SlashCommandInteractionDataOption[]
}

export interface SlashCommandInteractionDataResolved {
	users?: Record<Snowflake, Record<Snowflake, unknown>>,
	members?: Record<Snowflake, Record<Snowflake, unknown>>,
	roles?: Record<Snowflake, Record<Snowflake, unknown>>,
	channels?: Record<Snowflake, Record<Snowflake, unknown>>
}

export interface SlashCommandInteractionDataOption {

}

export interface GuildMemberStructure {
	user?: UserStructure,
	nick?: string | null,
	roles: Snowflake[],
	joined_at: ISO8601,
	premium_since?: string | null,
	deaf: boolean,
	mute: boolean,
	pending?: boolean,
	permissions?: string
}

export interface UserStructure {
	id: Snowflake,
	username: string,
	discriminator: string,
	avatar: string | null,
	bot?: boolean,
	system?: boolean,
	mfa_enabled?: boolean,
	locale?: boolean,
	verified?: boolean,
	email?: string | null,
	flags?: number,
	premium_type?: number,
	public_flags?: number
}

export interface RoleStructure {

}

export interface ChannelStructure {

}