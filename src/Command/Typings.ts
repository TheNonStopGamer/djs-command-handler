// SLASH COMMAND TYPINGS
export interface SlashCommandOption {
	type: CommandOptionType,
	name: string,
	description: string,
	default?: boolean,
	required?: boolean,
	choices?: ApplicationCommandOptionChoice[],
	options?: ApplicationCommandOption[]
}



// COMMAND TYPINGS
export enum OptionType {
	STRING = 3,
	HEXADECIMAL = 3.1,
	TIME = 3.2,
	SERVER_ID = 3.4,
	FLOAT = 3.4,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	VOICE_CHANNEL = 7.1,
	TEXT_CHANNEL = 7.2,
	NEWS_CHANNEL = 7.3,
	ROLE = 8
}