import { Snowflake } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyStringUnion<Literal extends string> = Literal | (string & {});

export type Category = AnyStringUnion<'General' | 'Fun' | 'Economy' | 'Moderation' | 'Misc'>;

export type Tag = AnyStringUnion<'Global' | 'Beta' | 'Alpha' | 'Testing' | 'Dev' | 'Scoped' | 'Guild'>;

export type RunFunc = (...args: unknown[]) => unknown;

export type ISO8601 = string;

export type Integer = number;

export type Bitfield = number;

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
	member?: GuildMember
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
	users?: Record<Snowflake, Record<Snowflake, User>>,
	members?: Record<Snowflake, Record<Snowflake, GuildMember>>,
	roles?: Record<Snowflake, Record<Snowflake, Role>>,
	channels?: Record<Snowflake, Record<Snowflake, Channel>>
}

export interface SlashCommandInteractionDataOption {
	name: string,
	type: SlashCommandOptionType,
	value?: OptionType,
	options?: SlashCommandInteractionDataOption[]
}

export interface GuildMember {
	user?: User,
	nick?: string | null,
	roles: Snowflake[],
	joined_at: ISO8601,
	premium_since?: string | null,
	deaf: boolean,
	mute: boolean,
	pending?: boolean,
	permissions?: string
}

export interface PartialGuildMember {
	user?: User,
	deaf: boolean,
	mute: boolean,
}

export interface User {
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
	flags?: Bitfield,
	premium_type?: PremiumType,
	public_flags?: Bitfield
}

export type PremiumType = 0 | 1 | 2;

export interface Role {
	id: Snowflake,
	name: string,
	color: Integer,
	hoist: boolean,
	position: Integer,
	permissions: string,
	managed: boolean,
	mentionable: boolean,
	tags?: RoleTags
}

export interface RoleTags {
	bot_id?: Snowflake,
	integration_id?: Snowflake,
	premium_subscriber: null
}

export interface Channel {
	id: Snowflake,
	type: ChannelType,
	guild_id?: Snowflake,
	position: Integer,
	permission_overwrites?: Overwrite[],
	name?: string,
	topic?: string | null,
	nsfw?: boolean,
	last_message_id?: Snowflake | null,
	bitrate?: Integer,
	user_limit?: Integer,
	rate_limit_per_user?: Integer,
	recipients?: User[],
	icon?: string | null,
	owner_id?: Snowflake,
	application_id?: Snowflake,
	parent_id?: Snowflake | null,
	last_pin_timestamp?: ISO8601 | null,
	rtc_region?: string | null,
	video_quality_mode?: VideoQualityMode
}

export enum VideoQualityMode {
	AUTO = 1,
	FULL = 2
}

export enum ChannelType {
	GUILD_TEXT = 0,
	DM = 1,
	GUILD_VOICE = 2,
	GROUP_DM = 3,
	GUILD_CATEGORY = 4,
	GUILD_NEWS = 5,
	GUILD_STORE = 6,
	GUILD_STAGE_VOICE = 13
}

export interface Overwrite {
	id: Snowflake,
	type: OverwriteType,
	allow: string,
	deny: string
}

export type OverwriteType = 0 | 1;

export interface PartialChannel {
	id: Snowflake,
	name: string,
	type: Integer,
	permission_overwrites?: Overwrite[],
}