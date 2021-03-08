import { PermissionResolvable } from 'discord.js';
import { Option } from './Option.js';
import { SubCommand } from './SubCommand.js';
import { SubCommandGroup } from './SubCommandGroup.js';
import { ApplicationCommand, ExecuteFunction, Category, Tags } from './Typings.js';

export interface CommandArgs {
	name: string,
	description: string,
	options?: Option[] | SubCommand[] | SubCommandGroup[],
	execute?: ExecuteFunction,
	permissions?: PermissionResolvable[],
	category?: Category,
	tags?: Tags
}

export enum Nesting {
	ROOT = 1,
	SUB_COMMAND = 2,
	SUB_COMMAND_GROUP = 3
}

export class Command implements ApplicationCommand {
	public readonly name: string;
	public readonly description: string;
	public readonly options?: Option[] | SubCommand[] | SubCommandGroup[];
	public readonly execute?: ExecuteFunction;
	public readonly permissions?: PermissionResolvable[];
	public readonly category?: Category;
	public readonly tags?: Tags;
	public readonly nesting: Nesting;

	constructor({
		name,
		description,
		options,
		execute,
		permissions,
		category,
		tags
	}: CommandArgs) {
		this.name = name;
		this.description = description;
		this.options = options;
		this.nesting = options?.[0] instanceof SubCommandGroup ? Nesting.SUB_COMMAND_GROUP : options?.[0] instanceof SubCommand ? Nesting.SUB_COMMAND : Nesting.ROOT;
		this.execute = execute;
		this.permissions = permissions;
		this.category = category;
		this.tags = tags;
	}
}