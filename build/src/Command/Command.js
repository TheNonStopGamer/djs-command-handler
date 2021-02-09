import { SubCommandGroup } from './SubCommandGroup.js';
import { SubCommand } from './SubCommand.js';
export class Command {
    /**
     * Creates a command object, this can be used as both a slash command and a regular command
     *
     * @param name The name of the command, will be the first argument for executing the command
     * @param description The description of the command, will be shown in the help menu and will be shown when used as slash command
     * @param config Tags are used to distinguish command groups, only used by the developer to for example post all slash commands with a certain tag. The category will decide where the command will show up under in the help menu. Permissions decide which users will be able to use the command, users with any of these permissions or any of these roles will have access to the command.
     * @param execute Only necessary when this command has no subcommands, otherwise it will not be used
     */
    constructor(name, description, { category, tags = [], permField = { roles: [], permissions: [], devTool: false } }, execute) {
        this.noPermsRequired = false;
        this._options = [];
        this.name = name;
        this.description = description;
        this.category = category;
        this._tags = tags;
        this.permField = {};
        if (!permField.devTool) {
            this.permField = permField;
            if (!permField.roles?.length && !permField.permissions?.length) {
                this.noPermsRequired = true;
            }
        }
        this.execute = execute;
    }
    get options() {
        return this._options;
    }
    get tags() {
        return this._tags;
    }
    get nesting() {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        return Command._NESTING_NAMES[(this._nesting || 1 /* Root */) - 1];
    }
    get nestingLevel() {
        return this._nesting || 1 /* Root */;
    }
    get helpData() {
        return {
            name: this.name,
            description: this.description,
            usage: '',
            category: this.category
        };
    }
    addSubCommandGroup(nameOrSubGroup, description, subCommands, permissions = { roles: [], permissions: [], devTool: false }) {
        if (this._nesting && this._nesting !== 3 /* SubCommandGroup */)
            throw new Error('Incorrect nesting, tried to add a SubCommand of nesting level 3 while nesting level currently is ' + this._nesting);
        this._nesting = 3 /* SubCommandGroup */;
        if (typeof nameOrSubGroup === 'object') {
            this._options.push(nameOrSubGroup);
        }
        else if (typeof nameOrSubGroup === 'string' && description && subCommands) {
            this._options.push(new SubCommandGroup(nameOrSubGroup, description, subCommands, permissions));
        }
        return this;
    }
    addSubCommand(nameOrSub, description, execute, permissions = { roles: [], permissions: [], devTool: false }, options) {
        if (this._nesting && this._nesting !== 2 /* SubCommand */)
            throw new Error('Incorrect nesting, tried to add a SubCommand of nesting level 2 while nesting level currently is ' + this._nesting);
        this._nesting = 2 /* SubCommand */;
        if (typeof nameOrSub === 'object') {
            this._options.push(nameOrSub);
        }
        else if (typeof nameOrSub === 'string' && description && execute) {
            this._options.push(new SubCommand(nameOrSub, description, execute, permissions, options));
        }
        return this;
    }
    addOption(option) {
        if (this._nesting && this._nesting !== 1 /* Root */)
            throw new Error('Incorrect nesting, tried to add a Option of nesting level 1 while nesting level currently is ' + this._nesting);
        this._nesting = 1 /* Root */;
        this._options.push(option);
        return this;
    }
}
Command._NESTING_NAMES = ['Root', 'SubCommand', 'SubCommandGroup'];
//# sourceMappingURL=Command.js.map