import { PermissionField, CommandExecuteFunction } from './Typings.js';
import { CommandOption } from './CommandOption.js';
export declare class SubCommand {
    readonly name: string;
    readonly description: string;
    readonly execute: CommandExecuteFunction;
    readonly permissions: PermissionField;
    private _options?;
    constructor(name: string, description: string, execute: CommandExecuteFunction, permissions?: PermissionField, options?: CommandOption[]);
}
