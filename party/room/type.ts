import z from 'zod';

/***********************
 * api types
 **********************/

export const zodRoomApi = z.object({
  command: z.enum(['create-room', 'start-game']),
});

export type RoomApi = z.infer<typeof zodRoomApi>;

export const zodCreateRoomDto = zodRoomApi.extend({
  command: z.literal('create-room'),
  userName: z.string(),
});

export type CreateRoomDto = z.infer<typeof zodCreateRoomDto>;

export const zodStartGameDto = zodRoomApi.extend({
  command: z.literal('start-game'),
});

export type StartGameDto = z.infer<typeof zodStartGameDto>;

/***********************
 * message types
 ***********************/

export const zodRoomMessage = z.object({
  type: z.enum(['chat', 'get-ready', 'not-ready']),
  sender: z.string(),
  message: z.string(),
});

export const zodChatMessage = zodRoomMessage.extend({
  type: z.literal('chat'),
  messageType: z.enum(['presence', 'message']),
});

export type ChatMessage = z.infer<typeof zodChatMessage>;
