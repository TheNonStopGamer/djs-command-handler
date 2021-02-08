import { Command } from '../Command/Command.js';
import { EventEmitter } from 'events';
import fs from 'fs';
export class CommandHandler extends EventEmitter {
    constructor({ devRole = '', prefix = ',' }) {
        super();
        this._commands = new Map();
        this._indexedCommands = new Map();
        this._devRole = devRole;
        this._prefix = prefix;
    }
    async setCommands(commandDir, runIndex = true) {
        const entries = [];
        await readDir(commandDir);
        async function readDir(directoryPath, fileExtensions = ['.js']) {
            for (const path of fs.readdirSync(directoryPath)) {
                if (fileExtensions.some(extension => path.endsWith(extension))) {
                    console.log(path, 'hi');
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
    get helpMenuData() {
        return [];
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