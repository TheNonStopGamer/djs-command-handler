export class SubCommand {
    constructor(name, description, execute, permissions = { roles: [], permissions: [], devTool: false }, options) {
        this.name = name;
        this.description = description;
        this.execute = execute;
        this.permissions = permissions;
        this._options = options;
    }
}
//# sourceMappingURL=SubCommand.js.map