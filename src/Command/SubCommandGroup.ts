import { PermissionField } from './Typings.js';
import { SubCommand } from './SubCommand.js';

export class SubCommandGroup {
  public readonly name: string;
  public readonly description: string;
  public readonly subCommands: SubCommand[];
  public readonly permissions?: PermissionField;

  constructor(
    name: string,
    description: string,
    subCommands: SubCommand[],
    permissions?: PermissionField
  ) {
    this.name = name;
    this.description = description;
    this.subCommands = subCommands;
    this.permissions = permissions;
  }
}