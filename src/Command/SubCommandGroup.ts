import { PermissionField, ApplicationCommandOption, ApplicationCommandOptionType } from './Typings.js';
import { SubCommand } from './SubCommand.js';

export class SubCommandGroup {
  public readonly name: string;
  public readonly description: string;
  private readonly _subCommands: SubCommand[];
  public readonly permissions?: PermissionField;

  constructor(
    name: string,
    description: string,
    subCommands: SubCommand[],
    permissions?: PermissionField
  ) {
    this.name = name;
    this.description = description;
    this._subCommands = subCommands;
    this.permissions = permissions;
  }

  public get slashCommandData(): ApplicationCommandOption {
    return {
      name: this.name,
      description: this.description,
      type: ApplicationCommandOptionType.SUB_COMMAND_GROUP,
      options: this._subCommands.map(sub => sub.slashCommandData)
    };
  }
}