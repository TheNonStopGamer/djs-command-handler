import { PathLike, readdirSync } from 'node:fs';
import { Command } from '../command/Command.js';
import { Category } from '../command/Typings.js';


export class CommandHandler {
	private readonly _directories: PathLike[];
	public readonly commands: Map<string, Command> = new Map<string, Command>();
	private readonly _index: {
		category: Map<Category, Map<string, Command>>
	} = { category: new Map<Category, Map<string, Command>>() }

	constructor(directories: PathLike[]) {
		this._directories = directories;
	}

	public init(): void {
		this.setCommands(this._directories);
	}

	private async setCommands(directories: PathLike[]): Promise<void> {
		const commands: Command[] = [];

		for (const directory of directories) {
			await importDir(directory, commands);
		}

		async function importDir(dir: PathLike, output: Command[]): Promise<void> {
			const commands: Command[] = [];

			for (const path of readdirSync(dir)) {
				if (path.match(/.+\.js/)?.[0] === path) return void await importDir(`${dir}/${path}`, output);
				const imported = (await import(`${dir}/${path}`)).default;
				if (imported instanceof Command) commands.push(imported);
			}
		}

		for (const command of commands) {
			this.commands.set(command.name, command);
		}
	}
}