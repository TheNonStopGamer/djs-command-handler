import { Command } from '../Command/Command.js';
import { EventEmitter } from 'events';
import fs from 'fs';
export class CommandHandler extends EventEmitter {
    constructor({ devRole = '', prefix = ',' }) {
        super();
        this._commands = new Map();
        this._tagIndexedCommands = new Map();
        this._categoryIndexedCommands = new Map();
        this._helpMenuData = new Map();
        this._devRole = devRole;
        this._prefix = prefix;
    }
    /**
     * Set the command directory for the command handler
     *
     * @param commandDir The directory that will be read, all subfolders will also be read by recursion
     * @param runIndex Indexes all the commands, strongly recommended to prevent performance issues when running
     */
    async setCommands(commandDir, runIndex = true) {
        const entries = [];
        await readDir(commandDir);
        async function readDir(directoryPath, fileExtensions = ['.js']) {
            for (const path of fs.readdirSync(directoryPath)) {
                if (fileExtensions.some(extension => path.endsWith(extension))) {
                    const command = (await import(`../../.${directoryPath}/${path}`)).default;
                    if (command instanceof Command)
                        entries.push(command);
                }
                else if (!path.includes('.') && fs.statSync(`${directoryPath}/${path}`)) {
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
    postGlobalSlashCommands(tags, client) {
        if (!client.user)
            throw new Error('Tried to post commands before client was initialized, post commands on the ready event');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client.api.applications(client.user?.id).commands.get().then((commands) => {
            for (const command of commands) {
                if (!this._commands.has(command.name)) {
                    client.api.applications(client.user.id).commands(command.id).delete();
                }
            }
        });
        for (const tag of tags) {
            for (const command of (this._tagIndexedCommands.get(tag) || [])) {
                client.api.applications(client.user.id).commands.post(command.data);
            }
        }
    }
    postGuildSlashCommands(tags, guild, client) {
        if (!client.user)
            throw new Error('Tried to post commands before client was initialized, post commands on the ready event');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client.api.applications(client.user?.id).guilds(guild).commands.get().then((commands) => {
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
    get helpMenuData() {
        return this._helpMenuData;
    }
    get commands() {
        return this._commands;
    }
    isAllowed(command, memberPerms, memberRoles) {
        return command.noPermsRequired
            || !!command.permField.permissions?.some(perm => memberPerms.has(perm))
            || memberRoles.has(this._devRole)
            || !!command.permField.roles?.some(id => memberRoles.has(id));
    }
}
//# sourceMappingURL=CommandHandler.js.map