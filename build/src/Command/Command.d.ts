import { PermissionField, CommandExecuteFunction, SubCommandNesting, CommandArgs, Options, Tag } from './Typings.js';
import { SubCommandGroup } from './SubCommandGroup.js';
import { SubCommand } from './SubCommand.js';
import { CommandOption } from './CommandOption.js';
export declare class Command {
    readonly name: string;
    readonly description: string;
    readonly category: string;
    private _tags;
    readonly permissions: PermissionField;
    private _options;
    private _nesting;
    readonly execute?: CommandExecuteFunction;
    /**
     * @param name The name of the command, will be the first argument for executing it
     * @param description The description of the command, will be shown in the help menu and will be shown when used as slash command
     * @param config Tags are used to distinguish command groups, only used by the developer to for example post all slash commands with a certain tag to a guild. The category will decide where the command will show up under in the help menu. Permissions decide which users will be able to use the command, users with any of these permissions or roles will have access to the command.
     * @param execute Only necessary when this command has no subcommands, otherwise it will not be used
     */
    constructor(name: string, description: string, { category, tags, permissions }: CommandArgs, execute?: CommandExecuteFunction);
    get options(): Options | undefined;
    get tags(): Tag[] | string[];
    get nesting(): SubCommandNesting;
    addSubCommandGroup(subCommandGroup: SubCommandGroup): Command;
    addSubCommandGroup(name: string, description: string, subCommands: SubCommand[], permissions: PermissionField): Command;
    addSubCommand(subCommand: SubCommand): Command;
    addSubCommand(name: string, description: string, execute: CommandExecuteFunction, permissions: PermissionField, options?: CommandOption[]): Command;
    addOption<T extends string | number>(option: CommandOption<T>): Command;
}
