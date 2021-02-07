import { Command } from '../Command/Command.ts'
import { Tag } from '../Command/Typings.ts'
import { Snowflake, Client } from 'discord.js';
import { EventEmitter } from 'events';
import fs from 'fs';

export interface CommandHandlerArgs {
  devRole: Snowflake
}

export class CommandHandler implements EventEmitter, Map {
  private readonly commands: Command[];
  private readonly devRole: Snowflake;
  
  constructor({ devRole = '' }: CommandHandlerArgs) {
    this.devRole = devRole;
  }
  
  public setCommands(commandDir: string, index: true) {
    
  }
  
  public postGlobalSlashCommands(tags: Tag[], client: Client) {
    
  }
  
  public postGuildSlashCommands(tags: Tag[], guild: Snowflake, client: Client) {
    
  }
}