import * as Command from './Command/index.js';
import * as CommandHandler from './CommandHandler/index.js';

export default {
	...Command,
	...CommandHandler
};