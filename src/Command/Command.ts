import { CommandOptions } from './Typings.js';
import { PermissionObject } from 'discord.js';

export class Command {
	public readonly name: string;
	public readonly permissions:
		public options: CommandOptions;

}