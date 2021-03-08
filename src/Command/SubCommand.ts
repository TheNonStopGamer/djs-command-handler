import { ApplicationCommandSubCommand, ExecuteFunction } from './Typings.js';
import { Option } from './Option.js';

export class SubCommand implements ApplicationCommandSubCommand {
	public readonly name: string;
	public readonly description: string;
	public readonly type: 1 = 1;
	public readonly options?: Option[];
	public readonly execute: ExecuteFunction;

	constructor(
		name: string,
		description: string,
		options: Option[],
		execute: ExecuteFunction
	) {
		this.name = name;
		this.description = description;
		this.options = options;
		this.execute = execute;
	}
}