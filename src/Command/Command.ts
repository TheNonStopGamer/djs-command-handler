import { PermissionField, CommandExecuteFunction, SubCommandNesting, CommandArgs, Options, Tag, Category, CommandHelpData } from './Typings.js';
import { SubCommandGroup } from './SubCommandGroup.js';
import { SubCommand } from './SubCommand.js';
import { CommandOption } from './CommandOption.js';

export class Command {
  private static _NESTING_NAMES: string[] = ['Root', 'SubCommand', 'SubCommandGroup'];

  public readonly name: string;
  public readonly description: string;
  public readonly category: Category;

  private _tags: Tag[];

  public readonly permField: PermissionField;
  public readonly noPermsRequired: boolean = false;

  private _options: Options = [];
  private _nesting?: SubCommandNesting;

  public readonly execute?: CommandExecuteFunction;

  /**
   * Creates a command object, this can be used as both a slash command and a regular command
   * 
   * @param name The name of the command, will be the first argument for executing the command
   * @param description The description of the command, will be shown in the help menu and will be shown when used as slash command
   * @param config Tags are used to distinguish command groups, only used by the developer to for example post all slash commands with a certain tag. The category will decide where the command will show up under in the help menu. Permissions decide which users will be able to use the command, users with any of these permissions or any of these roles will have access to the command.
   * @param execute Only necessary when this command has no subcommands, otherwise it will not be used
   */
  constructor(
    name: string,
    description: string,
    { category, tags = [], permField = { roles: [], permissions: [], devTool: false } }: CommandArgs,
    execute?: CommandExecuteFunction
  ) {
    this.name = name;
    this.description = description;
    this.category = category;

    this._tags = tags;

    this.permField = {};
    if (!permField.devTool) {
      this.permField = permField;
      if (!permField.roles?.length && !permField.permissions?.length) {
        this.noPermsRequired = true;
      }
    }

    this.execute = execute;
  }

  get options(): Options | undefined {
    return this._options;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  get nesting(): string {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    return Command._NESTING_NAMES[(this._nesting || SubCommandNesting.Root) - 1]!;
  }

  get nestingLevel(): SubCommandNesting {
    return this._nesting || SubCommandNesting.Root;
  }

  public get helpData(): CommandHelpData {
    let usage = this.name;
    switch (this._nesting) {
      case 1: {
        for (const option of this._options) {
          usage += ` <${option.name}>`;
        }
        break;
      }
      case 2: {
        usage += ' <';
        for (const option of this._options) {
          usage += option.name + ', ';
        }
        usage = usage.slice(0, -2);
        usage += '>';
        break;
      }
      case 3: {
        usage += ' <';
        for (const option of this._options) {
          usage += option.name + ', ';
        }
        usage = usage.slice(0, -2);
        usage += '>';
        break;
      }
    }
    return {
      name: this.name,
      description: this.description,
      usage, // TODO: create the usage stoof
      category: this.category
    };
  }

  public addSubCommandGroup(subCommandGroup: SubCommandGroup): this;
  public addSubCommandGroup(name: string, description: string, subCommands: SubCommand[], permissions?: PermissionField): this;
  public addSubCommandGroup(
    nameOrSubGroup: string | SubCommandGroup,
    description?: string,
    subCommands?: SubCommand[],
    permissions: PermissionField = { roles: [], permissions: [], devTool: false }
  ): this {
    if (this._nesting && this._nesting !== SubCommandNesting.SubCommandGroup) throw new Error('Incorrect nesting, tried to add a SubCommand of nesting level 3 while nesting level currently is ' + this._nesting);
    this._nesting = SubCommandNesting.SubCommandGroup;
    if (typeof nameOrSubGroup === 'object') {
      this._options.push(nameOrSubGroup);
    } else if (typeof nameOrSubGroup === 'string' && description && subCommands) {
      this._options.push(new SubCommandGroup(nameOrSubGroup, description, subCommands, permissions));
    }
    return this;
  }

  public addSubCommand(subCommand: SubCommand): this;
  public addSubCommand(name: string, description: string, execute: CommandExecuteFunction, permissions?: PermissionField, options?: CommandOption[]): this;
  public addSubCommand(
    nameOrSub: string | SubCommand,
    description?: string,
    execute?: CommandExecuteFunction,
    permissions: PermissionField = { roles: [], permissions: [], devTool: false },
    options?: CommandOption[]
  ): this {
    if (this._nesting && this._nesting !== SubCommandNesting.SubCommand) throw new Error('Incorrect nesting, tried to add a SubCommand of nesting level 2 while nesting level currently is ' + this._nesting);
    this._nesting = SubCommandNesting.SubCommand;
    if (typeof nameOrSub === 'object') {
      this._options.push(nameOrSub);
    } else if (typeof nameOrSub === 'string' && description && execute) {
      this._options.push(new SubCommand(nameOrSub, description, execute, permissions, options));
    }
    return this;
  }

  public addOption<T extends string | number>(option: CommandOption<T>): this {
    if (this._nesting && this._nesting !== SubCommandNesting.Root) throw new Error('Incorrect nesting, tried to add a Option of nesting level 1 while nesting level currently is ' + this._nesting);
    this._nesting = SubCommandNesting.Root;
    this._options.push(option);
    return this;
  }
}