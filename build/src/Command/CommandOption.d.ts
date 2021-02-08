import { OptionType, OptionArgs } from './Typings.js';
export declare abstract class CommandOption<T extends string | number = string | number> {
    readonly name: string;
    readonly description: string;
    readonly type: OptionType;
    readonly required: boolean;
    readonly choices?: [T, T][];
    constructor(name: string, description: string, type: OptionType, { required, choices }: OptionArgs<T>);
    abstract assertAndParse(arg: T): T | undefined;
}
export declare const opt: {
    String: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    Hex: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    Time: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    Server: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    Float: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    Int: {
        new (name: string, description: string, { required, choices }?: OptionArgs<number>): {
            assertAndParse(arg: number): number | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [number, number][] | undefined;
        };
    };
    Bool: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    User: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    Channel: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    VoiceChannel: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    TextChannel: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    NewsChannel: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
    Role: {
        new (name: string, description: string, { required, choices }?: OptionArgs<string>): {
            assertAndParse(arg: string): string | undefined;
            readonly name: string;
            readonly description: string;
            readonly type: OptionType;
            readonly required: boolean;
            readonly choices?: [string, string][] | undefined;
        };
    };
};
