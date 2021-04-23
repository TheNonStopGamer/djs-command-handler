import { PermissionString } from 'discord.js';
import { Tag, Category, RunFunc } from '../Typings.js';
import { Option } from './Option.js';
import { SubCommand } from './SubCommand.js';
import { SubCommandGroup } from './SubCommandGroup.js';

export interface CommandOptions {
	aliases?: string[],
	tags?: Tag[],
	permissions?: PermissionString[]
}

export type Options = { run: RunFunc, options: Option[] } | SubCommand[] | SubCommandGroup[];

export class Command {
	public readonly run?: RunFunc;

	public readonly name: string;
	public readonly description: string;
	public readonly category: Category;
	public readonly aliases: string[];
	public readonly tags: Tag[];

	public readonly options: Options;

	public readonly permissions?: PermissionString[];

	constructor(
		name: string,
		description: string,
		category: Category,
		options: Options,
		{ aliases = [], tags = [], permissions }: CommandOptions
	) {
		this.name = name;
		this.description = description;
		this.category = category;
		this.aliases = aliases;
		this.tags = tags;

		this.options = options;

		this.permissions = permissions;
	}
}