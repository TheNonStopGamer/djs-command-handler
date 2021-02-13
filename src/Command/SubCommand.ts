import { PermissionField, CommandExecuteFunction, ApplicationCommandOption, ApplicationCommandOptionType } from './Typings.js';
import { CommandOption } from './CommandOption.js';

export class SubCommand {
  public readonly name: string;
  public readonly description: string;
  private _options: CommandOption[];
  public readonly execute: CommandExecuteFunction;
  public readonly permissions: PermissionField;

  constructor(
    name: string,
    description: string,
    options: CommandOption[] = [],
    execute: CommandExecuteFunction,
    permissions: PermissionField = { roles: [], permissions: [], devTool: false }
  ) {
    this.name = name;
    this.description = description;
    this._options = options;
    this.execute = execute;
    this.permissions = permissions;
  }

  public get slashCommandData(): ApplicationCommandOption {
    return {
      name: this.name,
      description: this.description,
      type: ApplicationCommandOptionType.SUB_COMMAND,
      options: this._options.map(opt => opt.slashCommandData)
    };
  }
}