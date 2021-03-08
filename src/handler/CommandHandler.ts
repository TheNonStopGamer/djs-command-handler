import { PathLike, readdirSync } from 'node:fs';
import { Command } from '../command/Command.js';
import { Category } from '../command/Typings.js';


export class CommandHandler {
	private readonly _directories: PathLike[];
	public readonly commands: Map<string, Command> = new Map<string, Command>();
	private readonly _indexed: {
		category: Map<Category, Map<string, Command>>
	} = { category: new Map<Category, Map<string, Command>>() }

	constructor(directories: PathLike[]) {
		this._directories = directories;
	}

	public init(): void {
		this.setCommands(this._directories);
	}

	private async setCommands(directories: PathLike[]): Promise<void> {
		for (const directory of directories) {
			for (const path of readdirSync(directory)) {
				const imported = (await import(`${directory}/${path}`)).default;
				if (imported instanceof Command) this.commands.set(imported.name, imported);
			}
		}
	}
}