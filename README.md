- [1. So what the fuck is this](#1-so-what-the-fuck-is-this)
  - [1.1 Command Creation](#11-command-creation)
  - [1.2 Handling](#12-handling)
  - [1.3 You said extra features?](#13-you-said-extra-features)
    - [**Embed-sites**](#embed-sites)
- [2. Components](#2-components)
  - [1.1. Typings](#11-typings)
  - [1.2. Command Handler](#12-command-handler)
  - [1.3. Command](#13-command)
  - [1.4. Menu](#14-menu)
  - [1.5. Website-embed](#15-website-embed)

# 1. So what the fuck is this

Elo mate, this is a command handler with some extra features, the total list of components is [2. Components](#2-components).

Dependencies: `npm install discord.js`

## 1.1 Command Creation

Command creation is as simple as it sounds, not amazingly simple but better with the library then without.

```ts
import ch from 'djs-command-handler'; // Or of course require('djs-command-handler');

const command = new ch.Command('name', 'description', { category: 'General', tags: ['foo'], permField: { permissions: ['MANAGE_MESSAGES', 'BE_COOL'/*not a real permission btw*/] } });

command.addSubCommand('subcommand', 'le description again', (parsed, guild, channel, member) => {
  channel.send('This is what gets executed, that all happens automatically, but can also be done manually');
});

export default command;
```

Everything is typed, so it's easy to use (as long as u use an IDE any better than notepad). All the commands can both be used as regular commands, and even as slash commands. The slash commands can be seperately posted by using the tags. The entire slash commands data structure is defined as well, that way (for the typescripters under us) you can also create totally manual and handmade slash commands with type validation

## 1.2 Handling

Commands can both be automatically executed, or you can listen to the events of the commands handling. All commands can be set by specifying a directory.

```ts
import ch from 'djs-command-handler';
import Discord from 'discord.js';

const client = new Client();

const commandHandler = new ch.CommandHandler({ devRole: 'developer role id' /*every command can be ran by developers*/, prefix: '!' });

commandHandler.setCommands('./cooomands', true /*(runIndex) this is set by default, you should probably leave it to true, will introduce heavy performance issues when disabled*/);

commandHandler.postGlobalSlashCommands(['foo'], client); // Posts all the commands with the tag 'foo'
```

## 1.3 You said extra features?

Yes sir I did, it has a reaction menu system and a new thing I am working on...

### **Embed-sites**

Yeah I know doesn't sound as exciting as you probably expected. It's basically a way of creating a sort of website, in Discord embeds. Sub-pages, forms, selection menu's, toggleable boolean, etc. This could be very useful for example a settings menu.

```ts
// Jk won't do the entire code example thing yet because 1. i'm busy, 2. i actually don't know how it will work yet
```

Ok so yeah i'll be writing more here, but these are the base features of the module. All components are listed below, together with a checklist of my progress

# 2. Components

## 1.1. Typings
- [X] <U>Client api and ws</U>
- [X] <U>Interaction</U>
- [X] <U>Command</U>
- [X] <U>Responses</U>

## 1.2. Command Handler
- [ ] <U>SlashCommand handling</U>
- [ ] <U>Command handling</U>
- [X] <U>Command setting</U>
- [X] <U>Event emitter</U>
- [ ] <U>Command help message generation</U>
- [ ] <U>Command list for custom help messages/parsing</U>
- [ ] <U>Direct SubCommand execution</U>

## 1.3. Command
- [X] <U>Name, description and config</U>
- [X] <U>SubCommand, SubCommandGroup</U>
- [X] <U>Options and choices</U>
- [X] <U>Typings</U>
- [X] <U>Permissions, Whitelisted Roles, DevTool</U>
- [X] <U>Help data generation</U>
- [ ] <U>Parsing system</U>

## 1.4. Menu
- [ ] <U>Pages</U>
- [ ] <U>Stop</U>
- [ ] <U>Forward, Backward, Speed Forward, Speed Backward</U>
- [ ] <U>Index-based</U>

## 1.5. Website-embed
- [ ] <U>Main Page</U>
- [ ] <U>SubPages</U>
- [ ] <U>Reaction Elements</U>
- [ ] <U>Form</U>
- [ ] <U>Command Fill In (Form-like command execution)</U>