import * as Command from './src/Command/Command.js';
import * as CommandOption from './src/Command/CommandOption.js';
import * as SubCommand from './src/Command/SubCommand.js';
import * as SubCommandGroup from './src/Command/SubCommandGroup.js';
import * as CommandTypings from './src/Command/Typings.js';
import * as CommandHandler from './src/CommandHandler/CommandHandler.js';
declare const _default: {
    CommandHandler: typeof CommandHandler.CommandHandler;
    OptionType: typeof CommandTypings.OptionType;
    SubCommandNesting: typeof CommandTypings.SubCommandNesting;
    SubCommandGroup: typeof SubCommandGroup.SubCommandGroup;
    SubCommand: typeof SubCommand.SubCommand;
    CommandOption: typeof CommandOption.CommandOption;
    opt: {
        String: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        Hex: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        Time: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        Server: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        Float: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        Int: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<number>): {
                assertAndParse(arg: number): number | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [number, number][] | undefined;
            };
        };
        Bool: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        User: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        Channel: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        VoiceChannel: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        TextChannel: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        NewsChannel: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
        Role: {
            new (name: string, description: string, { required, choices }?: CommandTypings.OptionArgs<string>): {
                assertAndParse(arg: string): string | undefined;
                readonly name: string;
                readonly description: string;
                readonly type: CommandTypings.OptionType;
                readonly required: boolean;
                readonly choices?: [string, string][] | undefined;
            };
        };
    };
    Command: typeof Command.Command;
};
export default _default;
