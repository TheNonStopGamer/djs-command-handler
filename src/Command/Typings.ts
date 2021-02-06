import { PermissionString, Snowflake } from 'discord.js';
import { SubCommandGroup } from './SubCommandGroup.js';
import { SubCommand } from './SubCommand.js';
import { CommandOption } from './CommandOption.js';

export interface PermissionField {
  roles?: Snowflake[],
  permissions?: PermissionString[],
  devTool?: boolean
}

export enum OptionType {
  STRING = 3,
  HEXADECIMAL = 3.1,
  TIME = 3.2,
  SERVER_ID = 3.4,
  FLOAT = 3.4,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  VOICE_CHANNEL = 7.1,
  TEXT_CHANNEL = 7.2,
  NEWS_CHANNEL = 7.3,
  ROLE = 8
}

export const enum SubCommandNesting {
  Root = 1,
  SubCommand = 2,
  SubCommandGroup = 3
}

export interface CommandArgs {
  permissions?: PermissionField,
  tags?: Tag[] | string[],
  category: string
}

export interface OptionArgs<T extends string | number = string | number> {
  required?: boolean,
  choices?: [T, T][]
}

export type Options = SubCommandGroup[] & SubCommand[] & CommandOption[];

export type Tag = 'global' | 'guild' | 'test-guild' | 'staff-guild' | 'beta' | 'production' | 'devtool' | 'scope-1' | 'scope-2' | 'scope-3' | 'scope-4' | 'scope-5';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandExecuteFunction = (...args: any[]) => void;