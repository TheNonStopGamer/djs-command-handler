import { Command } from '../Command/Command.js';
import { Tag } from '../Command/Typings.js';
import { Snowflake, Client, Permissions, Collection, Role } from 'discord.js';
import { EventEmitter } from 'events';
import fs from 'fs';
import { CommandHandlerOptions, CommandEvent, Categories } from './Typings.js';

export declare interface CommandHandler extends EventEmitter {
  on<K extends keyof CommandEvent>(event: K, listener: (...args: CommandEvent[K]) => void): this,
  once<K extends keyof CommandEvent>(event: K, listener: (...args: CommandEvent[K]) => void): this,
  emit<K extends keyof CommandEvent>(event: K, ...args: CommandEvent[K]): boolean
}

export class CommandHandler extends EventEmitter {
  private _commands: Map<string, Command> = new Map<string, Command>();
  private readonly _devRole: Snowflake;

  constructor({ devRole = '' }: CommandHandlerOptions) {
    super();
    this._devRole = devRole;
  }

  public async setCommands(commandDir: string, index: boolean): Promise<Map<string, Command>> {
    return this._commands;
  }

  public postGlobalSlashCommands(tags: Tag[], client: Client): void {

  }

  public postGuildSlashCommands(tags: Tag[], guild: Snowflake, client: Client): void {

  }

  public isAllowed(command: Command, memberPerms: Permissions, memberRoles: Collection<Snowflake, Role>): boolean {
    return memberRoles.has(this._devRole)
      || !!command.permField.permissions?.some(perm => memberPerms.has(perm))
      || !!command.permField.roles?.some(id => memberRoles.has(id));
  }
}