import { PermissionString, Snowflake } from "discord.js";
export interface PermissionField {
    roles?: Snowflake[];
    permissions?: PermissionString[];
    devTool?: boolean;
}
export declare abstract class BaseSubCommandGroup {
    abstract readonly subCommands: Array<BaseSubCommand>;
    abstract readonly permissions: PermissionField;
}
export declare abstract class BaseSubCommand {
    abstract readonly options: Array<BaseCommandOption>;
    abstract readonly permissions: PermissionField;
}
export declare enum CommandOptionType {
    STRING = 3,
    HEXADECIMAL = 3.1,
    INTEGER = 4,
    FLOAT = 4.1,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    VOICE_CHANNEL = 7.1,
    TEXT_CHANNEL = 7.2,
    ROLE = 8
}
export declare abstract class BaseCommandOption {
    abstract readonly name: string;
    abstract readonly type: CommandOptionType;
}
export declare const enum SubCommandNesting {
    Root = 0,
    SubCommand = 1,
    SubCommandGroup = 2
}
export declare abstract class BaseCommand {
    abstract readonly options: BaseSubCommandGroup[] | BaseSubCommand[] | BaseCommandOption[];
    abstract readonly nesting: SubCommandNesting;
    abstract readonly permissions: PermissionField;
}
