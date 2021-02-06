import { PermissionField, CommandExecuteFunction } from './Typings.js';
import { CommandOption } from './CommandOption.js';

export class SubCommand {
  public readonly name: string;
  public readonly description: string;
  public readonly execute: CommandExecuteFunction;
  public readonly permissions: PermissionField;
  private _options?: CommandOption[];

  constructor(
    name: string,
    description: string,
    execute: CommandExecuteFunction,
    permissions: PermissionField = { roles: [], permissions: [], devTool: false },
    options?: CommandOption[]
  ) {
    this.name = name;
    this.description = description;
    this.execute = execute;
    this.permissions = permissions;
    this._options = options;
  }
}