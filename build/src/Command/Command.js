import { SubCommandGroup } from './SubCommandGroup.js';
import { SubCommand } from './SubCommand.js';
export class Command {
    /**
     * @param name The name of the command, will be the first argument for executing it
     * @param description The description of the command, will be shown in the help menu and will be shown when used as slash command
     * @param config Tags are used to distinguish command groups, only used by the developer to for example post all slash commands with a certain tag to a guild. The category will decide where the command will show up under in the help menu. Permissions decide which users will be able to use the command, users with any of these permissions or roles will have access to the command.
     * @param execute Only necessary when this command has no subcommands, otherwise it will not be used
     */
    constructor(name, description, { category, tags = [], permissions = { roles: [], permissions: [], devTool: false } }, execute) {
        this._options = [];
        this._nesting = 1 /* Root */;
        this.name = name;
        this.description = description;
        this.category = category;
        this._tags = tags;
        this.permissions = permissions;
        this.execute = execute;
    }
    get options() {
        return this._options;
    }
    get tags() {
        return this._tags;
    }
    get nesting() {
        return this._nesting;
    }
    addSubCommandGroup(name, description, permissions = { roles: [], permissions: [], devTool: false }, subCommands) {
        if (this._nesting && this._nesting !== 3 /* SubCommandGroup */)
            throw new Error('Incorrect nesting, tried to add a SubCommand of nesting level 3 while nesting level currently is ' + this._nesting);
        this._nesting = 3 /* SubCommandGroup */;
        this._options.push(new SubCommandGroup(name, description, permissions, subCommands));
        return this;
    }
    addSubCommand(nameOrSub, description, execute, permissions = { roles: [], permissions: [], devTool: false }, options) {
        if (nameOrSub instanceof SubCommand) {
            this._options.push(nameOrSub);
        }
        else if (typeof nameOrSub === 'string' && description && execute) {
            if (this._nesting && this._nesting !== 2 /* SubCommand */)
                throw new Error('Incorrect nesting, tried to add a SubCommand of nesting level 2 while nesting level currently is ' + this._nesting);
            this._nesting = 2 /* SubCommand */;
            this._options.push(new SubCommand(nameOrSub, description, execute, permissions, options));
        }
        return this;
    }
    addOption(option) {
        if (this._nesting && this._nesting !== 1 /* Root */)
            throw new Error('Incorrect nesting, tried to add a Option of nesting level 1 while nesting level currently is ' + this._nesting);
        this._options.push(option);
        return this;
    }
}
//# sourceMappingURL=Command.js.map