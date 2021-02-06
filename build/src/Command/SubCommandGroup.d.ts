import { PermissionField } from './Typings.js';
import { SubCommand } from './SubCommand.js';
export declare class SubCommandGroup {
    readonly name: string;
    readonly description: string;
    readonly subCommands: SubCommand[];
    readonly permissions?: PermissionField;
    constructor(name: string, description: string, subCommands: SubCommand[], permissions?: PermissionField);
}
