import { InteractionResponseData } from './Response.js';
import { ApplicationCommandData, ApplicationCommand } from './SlashCommand.js';
declare module 'discord.js' {
    interface Client {
        readonly api: {
            readonly interactions: (id: Snowflake, token: string) => {
                readonly callback: {
                    readonly post: (responseData: InteractionResponseData) => void;
                };
            };
            readonly applications: (id: Snowflake) => {
                guilds: (id: Snowflake) => {
                    commands: {
                        get: () => Promise<ApplicationCommand[]>;
                        post: (command: ApplicationCommandData) => void;
                    } & ((id: Snowflake) => {
                        delete: () => void;
                    });
                };
                commands: {
                    get: () => Promise<ApplicationCommand[]>;
                    post: (command: ApplicationCommandData) => void;
                } & ((id: Snowflake) => {
                    delete: () => void;
                });
            };
        };
    }
}
