import { PermissionResolvable } from 'discord.js';
import { Option } from './Option';
import { SubCommand } from './SubCommand';
import { SubCommandGroup } from './SubCommandGroup';
import { ApplicationCommand, ExecuteFunction } from './Typings';

export interface CommandArgs {
	name: string,
	description: string,
	options?: Option[] | SubCommand[] | SubCommandGroup[],
	execute?: ExecuteFunction,
	permissions?: PermissionResolvable[]
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
	public readonly nesting: Nesting;

	constructor({
		name,
		description,
		options,
		execute,
		permissions
	}: CommandArgs) {
		this.name = name;
		this.description = description;
		this.options = options;
		this.nesting = options?.[0] instanceof SubCommandGroup ? Nesting.SUB_COMMAND_GROUP : options?.[0] instanceof SubCommand ? Nesting.SUB_COMMAND : Nesting.ROOT;
		this.execute = execute;
		this.permissions = permissions;
	}
}