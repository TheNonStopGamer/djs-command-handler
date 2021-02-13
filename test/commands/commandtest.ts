import { Command } from '../../src/Command/Command.js';
import { opt } from '../../src/Command/CommandOption.js';
import { SubCommand } from '../../src/Command/SubCommand.js';

const command = new Command(
  'testname',
  'testdescription',
  { category: 'General', tags: ['production'] }
);

command.addSubCommand(new SubCommand(
  'henlo',
  'desc',
  [new opt.Bool('testopt2', 'testdesc')],
  () => { console.log('execootion'); }
));

export default command;

console.log(JSON.stringify(command.slashCommandData));