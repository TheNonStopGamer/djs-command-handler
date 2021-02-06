import { BaseCommand, BaseCommandOption, BaseSubCommand, BaseSubCommandGroup, PermissionField, SubCommandNesting } from "./BaseCommand.js";
export declare class Command implements BaseCommand {
    readonly options: BaseSubCommandGroup[] | BaseSubCommand[] | BaseCommandOption[];
    readonly nesting: SubCommandNesting;
    readonly permissions: PermissionField;
    constructor(permissions: PermissionField, options: BaseSubCommandGroup[] | BaseSubCommand[] | BaseCommandOption[]);
}
