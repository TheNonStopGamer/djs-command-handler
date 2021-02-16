import * as Command from './src/Command/Command.js';
import * as CommandOption from './src/Command/CommandOption.js';
import * as SubCommand from './src/Command/SubCommand.js';
import * as SubCommandGroup from './src/Command/SubCommandGroup.js';
import * as CommandTypings from './src/Command/Typings.js';

import * as CommandHandler from './src/CommandHandler/CommandHandler.js';
import * as CommandHandlerTypings from './src/CommandHandler/Typings.js';

import * as Menu from './src/Menu/Menu.js';

import * as ClientTypings from './src/Typings/Client.js';
import * as InteractionTypings from './src/Typings/Interaction.js';
import * as ResponseTypings from './src/Typings/SlashCommand.js';
import * as SlashCommandTypings from './src/Typings/SlashCommand.js';

import * as parse from './src/Utils/parse.js';

export default {
  ...Command,
  ...CommandOption,
  ...SubCommand,
  ...SubCommandGroup,
  ...CommandTypings,
  ...CommandHandler,
  ...CommandHandlerTypings,
  ...Menu,
  ...ClientTypings,
  ...InteractionTypings,
  ...ResponseTypings,
  ...SlashCommandTypings,
  ...parse
};

const commandHandler = new CommandHandler.CommandHandler({ devRole: 'test' });

await commandHandler.setCommands('./build/test/commands');