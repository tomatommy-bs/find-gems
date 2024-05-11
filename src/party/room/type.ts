import {PLAYER_POSITION} from '@/src/functions/Player';
import {
  FORCE_CLIENT_ACT_MESSAGE,
  WAITING_FOR_STATE,
  zodChestInfoKnownByPlayer,
} from '@/src/types/game';
import next from 'next';
import z from 'zod';

/***********************
 * api dto types
 **********************/

export const zodRoomApiDto = z.object({
  command: z.enum([
    WAITING_FOR_STATE.startGame,
    WAITING_FOR_STATE.NPutStone,
    WAITING_FOR_STATE.SPutStone,
    WAITING_FOR_STATE.NCheckChest,
    WAITING_FOR_STATE.SCheckChest,
    WAITING_FOR_STATE.nextGame,
    WAITING_FOR_STATE.restartGame,
  ]),
});
export type RoomApi = z.infer<typeof zodRoomApiDto>;

export const zodStartGameDto = zodRoomApiDto.extend({
  command: z.literal(WAITING_FOR_STATE.startGame),
});
export type StartGameDto = z.infer<typeof zodStartGameDto>;

export const zodCheckChestDto = zodRoomApiDto.extend({
  command: z.enum([
    WAITING_FOR_STATE.NCheckChest,
    WAITING_FOR_STATE.SCheckChest,
  ]),
  chestIndex: z.number(),
});
export type CheckChestDto = z.infer<typeof zodCheckChestDto>;

export const zodPutStoneDto = zodRoomApiDto.extend({
  command: z.enum([WAITING_FOR_STATE.NPutStone, WAITING_FOR_STATE.SPutStone]),
  chestIndex: z.number(),
});
export type PutStoneDto = z.infer<typeof zodPutStoneDto>;

export const zodNextGameDto = zodRoomApiDto.extend({
  command: z.literal(WAITING_FOR_STATE.nextGame),
});
export type NextGameDto = z.infer<typeof zodNextGameDto>;

/***********************
 * api response types
 **********************/

const zodRoomApiResponse = z.object({
  nextToDo: z.enum([
    WAITING_FOR_STATE.startGame,
    WAITING_FOR_STATE.NPutStone,
    WAITING_FOR_STATE.SPutStone,
    WAITING_FOR_STATE.NCheckChest,
    WAITING_FOR_STATE.SCheckChest,
    WAITING_FOR_STATE.restartGame,
  ]),
});

export const createRoomResponse = zodRoomApiResponse.extend({
  id: z.string(),
  nextToDo: z.literal(WAITING_FOR_STATE.startGame),
});
export type CreateRoomResponse = z.infer<typeof createRoomResponse>;

/***********************
 * message types dto (to server)
 ***********************/

export const ROOM_MESSAGE_TYPE = {
  chat: 'chat',
  syncGame: 'sync-game',
  syncPresence: 'sync-presence',
  forceClient: 'force-client',
  join: 'join',
} as const;

export const zodRoomMessageDto = z.object({
  type: z.enum([ROOM_MESSAGE_TYPE.chat, ROOM_MESSAGE_TYPE.join]),
});
export type RoomMessageDto = z.infer<typeof zodRoomMessageDto>;

export const zodChatMessageDto = zodRoomMessageDto.extend({
  type: z.literal(ROOM_MESSAGE_TYPE.chat),
  messageType: z.enum(['presence', 'message']),
  message: z.string(),
});
export type ChatMessageDto = z.infer<typeof zodChatMessageDto>;

export const zodJoinRoomMessageDto = zodRoomMessageDto.extend({
  type: z.literal(ROOM_MESSAGE_TYPE.join),
  name: z.string(),
});
export type JoinRoomMessageDto = z.infer<typeof zodJoinRoomMessageDto>;

/***********************
 * message types (from server)
 ***********************/

export const zodRoomMessage = z.object({
  type: z.enum([
    ROOM_MESSAGE_TYPE.chat,
    ROOM_MESSAGE_TYPE.syncGame,
    ROOM_MESSAGE_TYPE.forceClient,
    ROOM_MESSAGE_TYPE.syncPresence,
  ]),
  sender: z.string(),
  message: z.string(),
});
export type RoomMessage = z.infer<typeof zodRoomMessage>;

export const zodChatMessage = zodRoomMessage.extend({
  type: z.literal(ROOM_MESSAGE_TYPE.chat),
  messageType: z.enum(['presence', 'message']),
});
export type ChatMessage = z.infer<typeof zodChatMessage>;

export const zodSyncGameMessage = zodRoomMessage.extend({
  type: z.literal(ROOM_MESSAGE_TYPE.syncGame),
  gameState: z.object({
    chestInfo: z.array(zodChestInfoKnownByPlayer),
    waitingFor: z.enum([
      WAITING_FOR_STATE.startGame,
      WAITING_FOR_STATE.NPutStone,
      WAITING_FOR_STATE.SPutStone,
      WAITING_FOR_STATE.NCheckChest,
      WAITING_FOR_STATE.SCheckChest,
      WAITING_FOR_STATE.nextGame,
      WAITING_FOR_STATE.restartGame,
    ]),
    position: z.enum([PLAYER_POSITION.N, PLAYER_POSITION.S]),
    score: z.object({
      N: z.number(),
      S: z.number(),
    }),
    wonBy: z.enum([PLAYER_POSITION.N, PLAYER_POSITION.S]).optional(),
  }),
});
export type SyncGameMessage = z.infer<typeof zodSyncGameMessage>;

export const zodSyncPresenceMessage = zodRoomMessage.extend({
  type: z.literal(ROOM_MESSAGE_TYPE.syncPresence),
  users: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      position: z.enum(['N', 'S']).optional(),
    })
  ),
});
export type SyncPresenceMessage = z.infer<typeof zodSyncPresenceMessage>;

/**
 * client に何かしらのアクションを強制するためのメッセージ
 */
export const zodForceClientActMessage = zodRoomMessage.extend({
  type: z.literal(ROOM_MESSAGE_TYPE.forceClient),
  sender: z.literal('system'),
  message: z.enum([FORCE_CLIENT_ACT_MESSAGE.jumpToGamePage]),
});
export type ForceClientActMessage = z.infer<typeof zodForceClientActMessage>;

/**
 *
 */

export type connectionState = {
  name?: string;
  position?: 'N' | 'S';
};
