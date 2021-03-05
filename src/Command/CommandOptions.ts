import { OptionType } from './Typings.js';

export interface OptionOptions {
	required?: boolean,

}

export class Option {
	public readonly name: string;
	public readonly description: string;
	public readonly type: OptionType;

	constructor(
		name: string,
		description: string,
		type: keyof typeof OptionType
	) {
		this.name = name;
		this.description = description;
		this.type = OptionType[type];
	}
}

new Option('Yeah', 'yeah', '')