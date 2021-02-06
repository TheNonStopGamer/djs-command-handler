import { PermissionField, CommandExecuteFunction, SubCommandNesting, CommandArgs, Options, Tag } from './Typings.js';
import { SubCommandGroup } from './SubCommandGroup.js';
import { SubCommand } from './SubCommand.js';
import { CommandOption } from './CommandOption.js';

export class Command {
  public readonly name: string;
  public readonly description: string;
  public readonly category: string;

  private _tags: Tag[] | string[];

  public readonly permissions: PermissionField;

  private _options: Options = [];
  private _nesting: SubCommandNesting = SubCommandNesting.Root;

  public readonly execute?: CommandExecuteFunction;

  /**
   * @param name The name of the command, will be the first argument for executing it
   * @param description The description of the command, will be shown in the help menu and will be shown when used as slash command
   * @param config Tags are used to distinguish command groups, only used by the developer to for example post all slash commands with a certain tag to a guild. The category will decide where the command will show up under in the help menu. Permissions decide which users will be able to use the command, users with any of these permissions or roles will have access to the command.
   * @param execute Only necessary when this command has no subcommands, otherwise it will not be used
   */
  constructor(
    name: string,
    description: string,
    { category, tags = [], permissions = { roles: [], permissions: [], devTool: false } }: CommandArgs,
    execute?: CommandExecuteFunction
  ) {
    this.name = name;
    this.description = description;
    this.category = category;

    this._tags = tags;

    this.permissions = permissions;

    this.execute = execute;
  }

  get options(): Options | undefined {
    return this._options;
  }

  get tags(): Tag[] | string[] {
    return this._tags;
  }

  get nesting(): SubCommandNesting {
    return this._nesting;
  }

  public addSubCommandGroup(
    name: string,
    description: string,
    permissions: PermissionField = { roles: [], permissions: [], devTool: false },
    subCommands: SubCommand[]
  ): Command {
    if (this._nesting && this._nesting !== SubCommandNesting.SubCommandGroup) throw new Error('Incorrect nesting, tried to add a SubCommand of nesting level 3 while nesting level currently is ' + this._nesting);
    this._nesting = SubCommandNesting.SubCommandGroup;
    this._options.push(new SubCommandGroup(name, description, permissions, subCommands));
    return this;
  }

  public addSubCommand(
    name: string,
    description: string,
    execute: CommandExecuteFunction,
    permissions: PermissionField = { roles: [], permissions: [], devTool: false },
    options?: CommandOption[]
  ): Command {
    if (this._nesting && this._nesting !== SubCommandNesting.SubCommand) throw new Error('Incorrect nesting, tried to add a SubCommand of nesting level 2 while nesting level currently is ' + this._nesting);
    this._nesting = SubCommandNesting.SubCommand;
    this._options.push(new SubCommand(name, description, execute, permissions, options));
    return this;
  }

  public addOption<T extends string | number>(
    option: CommandOption<T>
  ): Command {
    if (this._nesting && this._nesting !== SubCommandNesting.Root) throw new Error('Incorrect nesting, tried to add a Option of nesting level 1 while nesting level currently is ' + this._nesting);
    this._options.push(option);
    return this;
  }
}



