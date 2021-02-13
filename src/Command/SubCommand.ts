import { PermissionField, CommandExecuteFunction, ApplicationCommandOption, ApplicationCommandOptionType } from './Typings.js';
import { CommandOption } from './CommandOption.js';

export class SubCommand {
  public readonly name: string;
  public readonly description: string;
  public readonly execute: CommandExecuteFunction;
  public readonly permissions: PermissionField;
  private _options: CommandOption[];

  constructor(
    name: string,
    description: string,
    execute: CommandExecuteFunction,
    permissions: PermissionField = { roles: [], permissions: [], devTool: false },
    options: CommandOption[] = []
  ) {
    this.name = name;
    this.description = description;
    this.execute = execute;
    this.permissions = permissions;
    this._options = options;
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