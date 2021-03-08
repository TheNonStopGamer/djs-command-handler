import { Snowflake } from 'discord.js';
import { ApplicationCommandOption, ApplicationCommandOptionChoice, OptionType as OptionType, Validator } from './Typings';

const validators = (<M extends { [thingName: string]: Validator }>(things: M) => things)({
	string: {
		type: OptionType.STRING,
		validator: () => true
	},
	hexadecimal: {
		type: OptionType.STRING,
		validator: () => true
	},
	time: {
		type: OptionType.STRING,
		validator: () => true
	},
	server_id: {
		type: OptionType.STRING,
		validator: () => true
	},
	float: {
		type: OptionType.STRING,
		validator: () => true
	},
	integer: {
		type: OptionType.INTEGER,
		validator: () => true
	},
	boolean: {
		type: OptionType.BOOLEAN,
		validator: () => true
	},
	user: {
		type: OptionType.USER,
		validator: () => true
	},
	channel: {
		type: OptionType.CHANNEL,
		validator: () => true
	},
	voice_channel: {
		type: OptionType.CHANNEL,
		validator: () => true
	},
	text_channel: {
		type: OptionType.CHANNEL,
		validator: () => true
	},
	news_channel: {
		type: OptionType.CHANNEL,
		validator: () => true
	},
	role: {
		type: OptionType.ROLE,
		validator: () => true
	}
});

export interface OptionArgs<T extends string | number> {
	required?: boolean,
	choices?: ApplicationCommandOptionChoice<T>[]
}

export class Option<T extends string | number | boolean | Snowflake = string | number | boolean | Snowflake> implements ApplicationCommandOption {
	public readonly name: string;
	public readonly description: string;
	private readonly _validator: Validator<T>;
	public readonly type: OptionType;
	public readonly required: boolean;
	public readonly choices?: ApplicationCommandOptionChoice<T extends string ? string : T extends number ? number : never>[];

	constructor(
		name: string,
		description: string,
		type: keyof typeof validators | Validator<T>,
		{ required = true, choices = undefined }: OptionArgs<T extends string ? T : T extends number ? number : never> = { required: true, choices: undefined }
	) {
		this.name = name;
		this.description = description;
		this._validator = typeof type === 'string' ? validators[type] : type;
		this.type = this._validator.type;
		this.required = required;
		this.choices = choices;
	}
}