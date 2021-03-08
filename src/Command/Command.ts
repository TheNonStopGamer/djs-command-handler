import { PermissionResolvable } from 'discord.js';

export class Command {
	public readonly name: string;
	public readonly description: string;
	public readonly permissions?: PermissionResolvable;

	constructor(
		name: string,
		description: string,
		permissions?: PermissionResolvable[],
	) {
		this.name = name;
		this.description = description;
		this.permissions = permissions;
	}
}