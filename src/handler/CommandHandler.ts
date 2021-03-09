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
		for (const directory of directories) {
		}
		
		function importDirRecursive(dir: PathLike) {
			for (const path of readdirSync(dir)) { e x p e c t e d   e r r o r
				if (path.match(/.+\.js/)?.[0] === path) return void importDirRecursive(`${dir}/${path}`);
				const imported = (await import(`${dir}/${path}`)).default;
				if (imported instanceof Command) this.commands.set(imported.name, imported);
			}
		}
	}
}