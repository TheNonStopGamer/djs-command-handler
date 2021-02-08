/// <reference types="node" />
import { Command } from '../Command/Command.js';
import { Snowflake, Permissions, Collection, Role } from 'discord.js';
import { EventEmitter } from 'events';
import fs from 'fs';
import { CommandHandlerOptions, CommandEvent } from './Typings.js';
export declare interface CommandHandler extends EventEmitter {
    on<K extends keyof CommandEvent>(event: K, listener: (...args: CommandEvent[K]) => void): this;
    once<K extends keyof CommandEvent>(event: K, listener: (...args: CommandEvent[K]) => void): this;
    emit<K extends keyof CommandEvent>(event: K, ...args: CommandEvent[K]): boolean;
}
export declare class CommandHandler extends EventEmitter {
    private _commands;
    private _indexedCommands;
    private readonly _devRole;
    private readonly _prefix;
    constructor({ devRole, prefix }: CommandHandlerOptions);
    setCommands(commandDir: fs.PathLike, runIndex?: boolean): Promise<Map<string, Command>>;
    get helpMenuData(): unknown[];
    get commands(): Map<string, Command>;
    isAllowed(command: Command, memberPerms: Permissions, memberRoles: Collection<Snowflake, Role>): boolean;
}
