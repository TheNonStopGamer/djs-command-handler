import { PermissionString, Snowflake } from "discord.js";

export interface PermissionField {
  roles?: Snowflake[],
  permissions?: PermissionString[],
  devTool?: boolean
}

export abstract class BaseSubCommandGroup {
  public abstract readonly subCommands: Array<BaseSubCommand>;
  public abstract readonly permissions: PermissionField
}

export abstract class BaseSubCommand {
  public abstract readonly options: Array<BaseCommandOption>;
  public abstract readonly permissions: PermissionField
}

export enum CommandOptionType {
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

export abstract class BaseCommandOption {
  public abstract readonly name: string;
  public abstract readonly type: CommandOptionType;
}

export const enum SubCommandNesting {
  Root,
  SubCommand,
  SubCommandGroup
}

export abstract class BaseCommand {
  public abstract readonly options: BaseSubCommandGroup[] | BaseSubCommand[] | BaseCommandOption[];
  public abstract readonly nesting: SubCommandNesting;
  public abstract readonly permissions: PermissionField
}