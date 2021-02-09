export interface ApplicationCommandData {
    data: ApplicationCommand;
}
export interface ApplicationCommand {
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
}
export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    default?: boolean;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
}
export interface ApplicationCommandOptionChoice {
    name: string;
    value: string | number;
}
export declare enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8
}
