/// <reference types="node" />
import { Command } from '../Command/Command.js';
import { Tag } from '../Command/Typings.js';
import { Snowflake, Client, Permissions, Collection, Role } from 'discord.js';
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
    private _tagIndexedCommands;
    private _categoryIndexedCommands;
    private _helpMenuData;
    private readonly _devRole;
    private readonly _prefix;
    constructor({ devRole, prefix }: CommandHandlerOptions);
    /**
     * Set the command directory for the command handler
     *
     * @param commandDir The directory that will be read, all subfolders will also be read by recursion
     * @param runIndex Indexes all the commands, strongly recommended to prevent performance issues when running
     */
    setCommands(commandDir: fs.PathLike, runIndex?: boolean): Promise<Map<string, Command>>;
    postGlobalSlashCommands(tags: Tag[], client: Client): void;
    postGuildSlashCommands(tags: Tag[], guild: Snowflake, client: Client): void;
    get helpMenuData(): Map<string, Command[]>;
    get commands(): Map<string, Command>;
    isAllowed(command: Command, memberPerms: Permissions, memberRoles: Collection<Snowflake, Role>): boolean;
}
