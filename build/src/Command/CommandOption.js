import { OptionType } from './Typings.js';
export class CommandOption {
    constructor(name, description, type, { required = true, choices = undefined }) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.required = required;
        this.choices = choices;
    }
}
export const opt = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    String: class String extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.STRING, { required, choices });
        }
        assertAndParse(arg) {
            return !this.choices ? arg || undefined :
                (this.choices.some(choice => choice[0].toLowerCase() === arg.toLowerCase()) ? arg : undefined);
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Hex: class Hex extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.HEXADECIMAL, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/#[0-9a-f]{6}/i);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0].toLowerCase() === arg.toLowerCase()) ? arg.toLowerCase() : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Time: class Time extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.TIME, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/(\d+(ms|s|m|h|d)-?)+/i);
            const parsed = arg.toLowerCase().match(/(\d+(ms|s|m|h|d))+/gi)?.join('-');
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0].toLowerCase() === parsed) ? parsed : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Server: class Server extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.SERVER_ID, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/\d{17,}/);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Float: class Float extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.FLOAT, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/[+-]?(?=\.\d|\d)\d*\.?\d*(?:[eE][+-]?\d+)?/);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Int: class Int extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.INTEGER, { required, choices });
        }
        assertAndParse(arg) {
            return arg;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Bool: class Bool extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.BOOLEAN, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/true|false/i);
            return match?.[0] === arg ? match[0] : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    User: class User extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.STRING, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/\d{17,}/);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Channel: class Channel extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.STRING, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/\d{17,}/);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    VoiceChannel: class VoiceChannel extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.STRING, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/\d{17,}/);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TextChannel: class TextChannel extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.STRING, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/\d{17,}/);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NewsChannel: class NewsChannel extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.STRING, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/\d{17,}/);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Role: class Role extends CommandOption {
        constructor(name, description, { required = true, choices = undefined }) {
            super(name, description, OptionType.STRING, { required, choices });
        }
        assertAndParse(arg) {
            const match = arg.match(/\d{17,}/);
            return match?.[0] === arg ? (!this.choices ? arg :
                (this.choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
        }
    }
};
//# sourceMappingURL=CommandOption.js.map