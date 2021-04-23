import { PathLike, readdirSync } from 'fs';
import { Client } from 'discord.js';
import { Command } from '../Command/Command.js';

export interface CommandHandlerOptions {
	prefixes: string[]
}

export interface InitOptions {
	index: boolean
}

export class CommandHandler {
	private readonly _dir: PathLike;

	private readonly _commands: Map<string, Command> = new Map();
	private readonly _tags: Map<string, Command[]> = new Map();

	private readonly _prefixes: string[];

	constructor(dir: PathLike, { prefixes }: CommandHandlerOptions) {
		this._dir = dir;

		this._prefixes = prefixes;
	}

	public async init(client: Client, { index = true }: InitOptions = { index: true }): Promise<void> {
		await (async function importDir(dir: PathLike, thisArg: CommandHandler): Promise<void> {
			for (const dirent of readdirSync(dir, { withFileTypes: true })) {
				if (dirent.isDirectory()) importDir(dir, thisArg);
				else if (dirent.name.endsWith('.js')) {
					const command = (await import(`${dir}/${dirent.name}`)).default;

					thisArg._commands.set(command.name, command);

					for (const alias of command.aliases) thisArg._commands.set(alias, command);

					for (const tag of command.tags)
						if (thisArg._tags.has(tag)) thisArg._tags.get(tag)?.push(command);
						else thisArg._tags.set(tag, [command]);
				}
			}
		})(this._dir, this);
	}

	public get(name: string): Command | undefined {
		return this._commands.get(name);
	}
}