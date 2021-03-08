import { ApplicationCommandSubCommandGroup } from './Typings.js';
import { SubCommand } from './SubCommand.js';

export class SubCommandGroup implements ApplicationCommandSubCommandGroup {
	public readonly name: string;
	public readonly description: string;
	public readonly type: 2 = 2;
	public readonly subCommands?: SubCommand[];

	constructor(
		name: string,
		description: string,
		subCommands: SubCommand[]
	) {
		this.name = name;
		this.description = description;
		this.subCommands = subCommands;
	}
}