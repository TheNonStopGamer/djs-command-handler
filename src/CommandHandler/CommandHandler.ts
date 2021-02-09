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
  private _tagIndexedCommands: Map<string, Command[]> = new Map<string, Command[]>();
  private _categoryIndexedCommands: Map<string, Command[]> = new Map<string, Command[]>();
  private _helpMenuData: Map<string, Command[]> = new Map<string, Command[]>();
  private readonly _devRole: Snowflake;
  private readonly _prefix: string;

  constructor({ devRole = '', prefix = ',' }: CommandHandlerOptions) {
    super();
    this._devRole = devRole;
    this._prefix = prefix;
  }

  /**
   * Set the command directory for the command handler
   * 
   * @param commandDir The directory that will be read, all subfolders will also be read by recursion
   * @param runIndex Indexes all the commands, strongly recommended to prevent performance issues when running
   */
  public async setCommands(commandDir: fs.PathLike, runIndex = true): Promise<Map<string, Command>> {
    const entries: Command[] = [];
    await readDir(commandDir);
    async function readDir(directoryPath: fs.PathLike, fileExtensions: string[] = ['.js']) {
      for (const path of fs.readdirSync(directoryPath)) {
        if (fileExtensions.some(extension => path.endsWith(extension))) {
          const command = (await import(`../../.${directoryPath}/${path}`)).default;
          if (command instanceof Command) entries.push(command);
        } else if (!path.includes('.') && fs.statSync(`${directoryPath}/${path}`)) {
          await readDir(`${directoryPath}/${path}`);
        }
      }
    }
    for (const command of entries) {
      this._commands.set(command.name.toLowerCase(), command);
      if (runIndex) {
        for (const tag of command.tags) {
          this._tagIndexedCommands.set(tag, (this._tagIndexedCommands.get(tag) || []).concat([command]));
        }
        this._categoryIndexedCommands.set(command.category, (this._categoryIndexedCommands.get(command.category) || []).concat([command]));
      }
    }
    return this._commands;
  }

  public postGlobalSlashCommands(tags: Tag[], client: Client): void {
    if (!client.user) throw new Error('Tried to post commands before client was initialized, post commands on the ready event');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.api.applications(client.user?.id).commands.get().then((commands: any[]) => {
      for (const command of commands) {
        if (!this._commands.has(command.name)) {
          client.api.applications(client.user!.id).commands(command.id).delete();
        }
      }
    });

    for (const tag of tags) {
      for (const command of (this._tagIndexedCommands.get(tag) || [])) {
        //client.api.applications(client.user.id).commands.post(command.data);
      }
    }
  }

  public postGuildSlashCommands(tags: Tag[], guild: Snowflake, client: Client): void {
    if (!client.user) throw new Error('Tried to post commands before client was initialized, post commands on the ready event');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.api.applications(client.user?.id).guilds(guild).commands.get().then((commands: any[]) => {
      for (const command of commands) {
        if (!this._commands.has(command.name)) {
          // client.api.applications(client.user!.id).guilds(guild).commands(command.id).delete();
        }
      }
    });

    for (const tag of tags) {
      for (const command of (this._tagIndexedCommands.get(tag) || [])) {
        // client.api.applications(client.user.id).guilds(guild).commands.post(command.data);
      }
    }
  }

  public get helpMenuData(): Map<string, Command[]> {
    return this._helpMenuData;
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