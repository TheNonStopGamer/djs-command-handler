import { PermissionField } from './Typings.js';
import { SubCommand } from './SubCommand.js';
export declare class SubCommandGroup {
    readonly name: string;
    readonly description: string;
    readonly permissions: PermissionField;
    readonly subCommands: SubCommand[];
    constructor(name: string, description: string, permissions: PermissionField, subCommands: SubCommand[]);
}
