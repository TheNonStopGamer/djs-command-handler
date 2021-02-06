export class Command {
    constructor(permissions, options) {
        this.options = options;
        this.nesting = 0 /* Root */;
        this.permissions = permissions;
    }
}
console.log(typeof new Array());
//# sourceMappingURL=Command.js.map