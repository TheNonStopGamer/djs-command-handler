import { PermissionField } from './Typings.js';
import { SubCommand } from './SubCommand.js';

export class SubCommandGroup {
  public readonly name: string;
  public readonly description: string;
  public readonly permissions: PermissionField;
  public readonly subCommands: SubCommand[];

  constructor(
    name: string,
    description: string,
    permissions: PermissionField,
    subCommands: SubCommand[]
  ) {
    this.name = name;
    this.description = description;
    this.permissions = permissions;
    this.subCommands = subCommands;
  }
}