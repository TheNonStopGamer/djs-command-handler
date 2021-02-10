import { MessageEmbed, EmojiResolvable } from 'discord.js';

export interface MenuReactions {
  forward?: EmojiResolvable,
  fastForward?: EmojiResolvable,
  backward?: EmojiResolvable,
  fastBackward?: EmojiResolvable,
  stop?: EmojiResolvable,
  pages?: EmojiResolvable[]
}

export class Menu {
  private readonly _pages: MessageEmbed[];
  private readonly _reactions: MenuReactions;

  constructor(pages: MessageEmbed[], reactionOptions: MenuReactions) {
    this._pages = pages;
    this._reactions = reactionOptions;
  }
}