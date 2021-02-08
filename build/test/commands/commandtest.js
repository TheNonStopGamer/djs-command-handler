import { Command } from '../../src/Command/Command.js';
import { SubCommand } from '../../src/Command/SubCommand.js';
const command = new Command('testname', 'testdescription', { category: 'General', tags: ['production'] });
command.addSubCommandGroup('test', 'testier than before', [
    new SubCommand('test', 'testier', () => {
        console.log('reeeeee');
    })
]);
// command.addOption(new opt.String('test', 'testdesc'));
export default command;
//# sourceMappingURL=commandtest.js.map