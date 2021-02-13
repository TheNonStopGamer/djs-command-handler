import { OptionType, OptionArgs, ApplicationCommandOption } from './Typings.js';

export abstract class CommandOption<T extends string | number = string | number> {
  public readonly name: string;
  public readonly description: string;
  protected readonly _type: OptionType;
  protected readonly _required: boolean;
  protected readonly _choices?: [string, T][];

  constructor(
    name: string,
    description: string,
    type: OptionType,
    { required = true, choices = undefined }: OptionArgs<T>
  ) {
    this.name = name;
    this.description = description;
    this._type = type;
    this._required = required;
    this._choices = choices;
  }

  abstract assertAndParse(arg: T): T | undefined;

  public get slashCommandData(): ApplicationCommandOption {
    return {
      name: this.name,
      description: this.description,
      type: Math.floor(this._type),
      required: this._required,
      choices: this._choices?.map(choice => { return { name: choice[0], value: choice[1] }; })
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace opt {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class String extends CommandOption<string> {
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      return !this._choices ? arg || undefined :
        (this._choices.some(choice => choice[0].toLowerCase() === arg.toLowerCase()) ? arg : undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class Hex extends CommandOption<string> {
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.HEXADECIMAL, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/#[0-9a-f]{6}/i);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0].toLowerCase() === arg.toLowerCase()) ? arg.toLowerCase() : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class Time extends CommandOption<string> {
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.TIME, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/(\d+(ms|s|m|h|d)-?)+/i);
      const parsed = arg.toLowerCase().match(/(\d+(ms|s|m|h|d))+/gi)?.join('-');
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0].toLowerCase() === parsed) ? parsed : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class Server extends CommandOption<string>{
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.SERVER_ID, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d{17,}/);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class Float extends CommandOption<string> {
    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.FLOAT, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/[+-]?(?=\.\d|\d)\d*\.?\d*(?:[eE][+-]?\d+)?/);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class Int extends CommandOption<number> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<number> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.INTEGER, { required, choices });
    }

    assertAndParse(arg: number): number | undefined {
      return arg;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class Bool extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.BOOLEAN, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/true|false/i);
      return match?.[0] === arg ? match[0] : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class User extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d{17,}/);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class Channel extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d{17,}/);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class VoiceChannel extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d{17,}/);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class TextChannel extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d{17,}/);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class NewsChannel extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d{17,}/);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export class Role extends CommandOption<string> {

    constructor(
      name: string,
      description: string,
      { required = true, choices = undefined }: OptionArgs<string> = { required: true, choices: undefined }
    ) {
      super(name, description, OptionType.STRING, { required, choices });
    }

    assertAndParse(arg: string): string | undefined {
      const match = arg.match(/\d{17,}/);
      return match?.[0] === arg ? (!this._choices ? arg :
        (this._choices.some(choice => choice[0] === arg) ? arg : undefined)) : undefined;
    }
  }
}