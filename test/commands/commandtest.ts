import { Command } from '../../src/Command/Command.js';
import { opt } from '../../src/Command/CommandOption.js';
import { SubCommand } from '../../src/Command/SubCommand.js';

const command = new Command('testname', 'testdescription', { category: 'General', tags: ['production'] });

// command.addSubCommandGroup('test', 'testier than before', [
//   new SubCommand('test', 'testier', () => {
//     console.log('reeeeee');
//   }),
//   new SubCommand('test2', 'even more reeeeeee', () => {
//     console.log('even more REEEEEEEEE');
//   })
// ]);

// command.addSubCommandGroup('even testier', 'testier anyone has ever seen', [
//   new SubCommand('test', 'testier', () => {
//     console.log('reeeeee');
//   }),
//   new SubCommand('test2', 'even more reeeeeee', () => {
//     console.log('even more REEEEEEEEE');
//   })
// ]);

command.addOption(new opt.String('test', 'testdesc'));
command.addOption(new opt.String('testopt2', 'testdesc'));

export default command;