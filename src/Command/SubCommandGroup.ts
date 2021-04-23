import { SubCommand } from './SubCommand';

export class SubCommandGroup {
	public readonly name: string;
	public readonly description: string;

	public readonly subCommands: SubCommand[];

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