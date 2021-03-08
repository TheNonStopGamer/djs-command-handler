import { Snowflake } from 'discord.js';

// SLASH COMMAND TYPINGS
export interface ApplicationCommandOptionChoice<T extends string | number> {
	name: string,
	value: T
}

export interface ApplicationCommandOption<T extends string | number = string | number> {
	name: string,
	description: string,
	type: OptionType,
	required?: boolean,
	choices?: ApplicationCommandOptionChoice<T>[],
}

export interface ApplicationCommandSubCommand {
	name: string,
	description: string,
	type: 1,
	options?: ApplicationCommandOption[]
}

export interface ApplicationCommandSubCommandGroup {
	name: string,
	description: string,
	type: 2,
	options?: ApplicationCommandSubCommand[]
}

export interface ApplicationCommand {
	id?: Snowflake,
	application_id?: Snowflake,
	name: string,
	description: string,
	options?: ApplicationCommandOption[] | ApplicationCommandSubCommand[] | ApplicationCommandSubCommandGroup[]
}

export enum OptionType {
	STRING = 3,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	ROLE = 8
}

export type Validator<T extends string | number | boolean | Snowflake = string | number | boolean | Snowflake> = {
	type: OptionType,
	validator: (param: T) => boolean
}

export type ExecuteFunction = (...args: unknown[]) => void;