import { Command } from '../Command/Command.js';
import { Tag } from '../Command/Typings.js';
import { Snowflake, Client, Permissions, Collection, Role } from 'discord.js';
import { EventEmitter } from 'events';
import fs from 'fs';
import { CommandHandlerOptions, CommandEvent } from './Typings.js';

export declare interface CommandHandler extends EventEmitter {
  on<K extends keyof CommandEvent>(event: K, listener: (...args: CommandEvent[K]) => void): this,
  once<K extends keyof CommandEvent>(event: K, listener: (...args: CommandEvent[K]) => void): this,
  emit<K extends keyof CommandEvent>(event: K, ...args: CommandEvent[K]): boolean
}

export class CommandHandler extends EventEmitter {
  private _commands: Map<string, Command> = new Map<string, Command>();
  private _indexedCommands: Map<string, Command[]> = new Map<string, Command[]>();
  private readonly _devRole: Snowflake;
  private readonly _prefix: string;

  constructor({ devRole = '', prefix = ',' }: CommandHandlerOptions) {
    super();
    this._devRole = devRole;
    this._prefix = prefix;
  }

  public async setCommands(commandDir: fs.PathLike, runIndex = true): Promise<Map<string, Command>> {
    const entries: Command[] = [];
    await readDir(commandDir);
    async function readDir(directoryPath: fs.PathLike, fileExtensions: string[] = ['.js']) {
      for (const path of fs.readdirSync(directoryPath)) {
        if (fileExtensions.some(extension => path.endsWith(extension))) {
          console.log(path, 'hi');
          const command = (await import(`../../.${directoryPath}/${path}`)).default;
          if (command instanceof Command) entries.push(command);
        } else if (!path.includes('.') && fs.statSync(`${directoryPath}/${path}`)) {
          await readDir(`${directoryPath}/${path}`);
        }
      }
    }
    for (const command of entries) {
      this._commands.set(command.name, command);
      if (runIndex) {
        for (const tag of command.tags) {
          const indexedArray = (this._indexedCommands.get(tag) || []);
          indexedArray.push(command);
          this._indexedCommands.set(tag, indexedArray);
        }
      }
    }
    return this._commands;
  }

  // public postGlobalSlashCommands(tags: Tag[], client: Client): void {

  // }

  // public postGuildSlashCommands(tags: Tag[], guild: Snowflake, client: Client): void {

  // }

  public get helpMenuData(): unknown[] {
    return [];
  }

  public get commands(): Map<string, Command> {
    return this._commands;
  }

  public isAllowed(command: Command, memberPerms: Permissions, memberRoles: Collection<Snowflake, Role>): boolean {
    return command.noPermsRequired
      || !!command.permField.permissions?.some(perm => memberPerms.has(perm))
      || memberRoles.has(this._devRole)
      || !!command.permField.roles?.some(id => memberRoles.has(id));
  }
}