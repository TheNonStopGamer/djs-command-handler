import { Snowflake, Ckient} from 'discord.js';

declare module "discord.js" {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  interface Client {
    readonly api: {
      readonly interactions: (id: Snowflake, token: string) => {
        readonly callback: {
          readonly post: (responseData: InteractionResponseData) => void;
        }
      },
      readonly applications: (id: Snowflake) => {
        guilds: (id: Snowflake) => {
          commands: {
            get: () => Promise<ApplicationCommand[]> ,
            post: (command: SlashCommandData) => void;
          } & ((id: Snowflake) => { delete: () => void })
        }
        commands: {
          get: () => Promise<ApplicationCommand[]>,
          post: (command: SlashCommandData) => void;
        } & ((id: Snowflake) => { delete: () => void })
      }
    }
  }
}