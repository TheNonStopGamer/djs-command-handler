import { OptionType, OptionArgs } from './Typings.js';

export abstract class CommandOption<T extends string | number = string | number> {
  public readonly name: string;
  public readonly description: string;
  public readonly type: OptionType;
  public readonly required: boolean;
  public readonly choices?: [T, T][];

  constructor(
    name: string,
    description: string,
    type: OptionType,
    { required = true, choices = undefined }: OptionArgs<T>
  ) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.required = required;
    this.choices = choices;
  }

  abstract assertAndParse(arg: T): T | undefined;
}

export const opt = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  String: class String extends CommandOption<string> {
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      return !this.choices ? arg || undefined :
        (this.choices.some(choice => choice[0].toLowerCase() === arg.toLowerCase()) ? arg : undefined);
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Hex: class Hex extends CommandOption<string> {
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.HEXADECIMAL, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/#[0-9a-f]{6}/i);
      return match?.[0] === arg && arg ? (!this.choices ? arg :
        (this.choices.some(choice => choice[0].toLowerCase() === arg.toLowerCase()) ? arg.toLowerCase() : undefined)) : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Time: class Time extends CommandOption<string> {
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.TIME, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      return arg.match(/(\d+(ms|s|m|h|d)-?)+/i)?.[0] === arg ? arg.toLowerCase().match(/(\d+(ms|s|m|h|d))+/gi)?.join('-') : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Server: class Server extends CommandOption<string>{
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.SERVER_ID, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d+/i);
      return match?.[0] === arg ? match[0] : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Float: class Float extends CommandOption<string> {
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.FLOAT, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d+/i);
      return match?.[0] === arg ? match[0] : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Int: class Int extends CommandOption<number> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<number>
    ) {
      super(name, description, OptionType.INTEGER, { required, choices });
    }

    assertAndParse(arg: number): number | undefined {
      return arg;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Bool: class Bool extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.BOOLEAN, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/(true|false)/i);
      return match?.[0] === arg ? match[0] : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  User: class User extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d+/i);
      return match?.[0] === arg ? match[0] : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Channel: class Channel extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d+/i);
      return match?.[0] === arg ? match[0] : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  VoiceChannel: class VoiceChannel extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d+/i);
      return match?.[0] === arg ? match[0] : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  TextChannel: class TextChannel extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d+/i);
      return match?.[0] === arg ? match[0] : undefined;
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  NewsChannel: class NewsChannel extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assert(arg: string): boolean {
      const match = arg.match(this.filter);
      return !!match && match[0] === arg;
    }

    parse(arg: string): string | undefined {
      return arg.match(this.parser)?.[0];
    }
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Role: class Role extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string>
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assert(arg: string): boolean {
      const match = arg.match(this.filter);
      return !!match && match[0] === arg;
    }

    parse(arg: string): string | undefined {
      return arg.match(this.parser)?.[0];
    }
  }
};