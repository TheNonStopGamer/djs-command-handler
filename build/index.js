import * as Command from './src/Command/Command.js';
import * as CommandOption from './src/Command/CommandOption.js';
import * as SubCommand from './src/Command/SubCommand.js';
import * as SubCommandGroup from './src/Command/SubCommandGroup.js';
import * as CommandTypings from './src/Command/Typings.js';
import * as CommandHandler from './src/CommandHandler/CommandHandler.js';
import * as CommandHandlerTypings from './src/CommandHandler/Typings.js';
export default {
    ...Command,
    ...CommandOption,
    ...SubCommand,
    ...SubCommandGroup,
    ...CommandTypings,
    ...CommandHandler,
    ...CommandHandlerTypings
};
const commandHandler = new CommandHandler.CommandHandler({ devRole: 'test' });
await commandHandler.setCommands('./build/test/commands');
console.log(commandHandler.commands.get('testname')?.nesting);
console.log(JSON.stringify(commandHandler.commands.get('testname')));
console.log((564859369951461406n >> 1n).toString(2), (564859369951461406n).toString(2));
//# sourceMappingURL=index.js.map