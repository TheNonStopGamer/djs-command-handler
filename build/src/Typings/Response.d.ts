import { MessageEmbed } from 'discord.js';
export interface InteractionResponseData {
    data: InteractionResponse;
}
export interface InteractionResponse {
    type: InteractionResponseType;
    data?: InteractionApplicationCommandCallbackData;
}
export declare enum InteractionResponseType {
    Pong = 1,
    Acknowledge = 2,
    ChannelMessage = 3,
    ChannelMessageWithSource = 4,
    AcknowledgeWithSource = 5
}
export interface InteractionApplicationCommandCallbackData {
    tts?: boolean;
    content: string;
    embeds?: MessageEmbed[];
    allowed_mentions?: string[];
}
