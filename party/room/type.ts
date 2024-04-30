import {
  ChestInfoKnownByPlayer,
  WAITING_FOR_STATE,
  zodChestInfoKnownByPlayer,
} from '@/types/game';
import next from 'next';
import z from 'zod';

/***********************
 * api dto types
 **********************/

export const zodRoomApiDto = z.object({
  command: z.enum([
    'create-room',
    WAITING_FOR_STATE.startGame,
    WAITING_FOR_STATE.NPutStone,
    WAITING_FOR_STATE.SPutStone,
    WAITING_FOR_STATE.NCheckChest,
    WAITING_FOR_STATE.SCheckChest,
    WAITING_FOR_STATE.restartGame,
  ]),
});
export type RoomApi = z.infer<typeof zodRoomApiDto>;

export const zodCreateRoomDto = zodRoomApiDto.extend({
  command: z.literal('create-room'),
  userName: z.string(),
});
export type CreateRoomDto = z.infer<typeof zodCreateRoomDto>;

export const zodStartGameDto = zodRoomApiDto.extend({
  command: z.literal('start-game'),
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
 * message types
 ***********************/

export const zodRoomMessage = z.object({
  type: z.enum(['chat', 'get-ready', 'not-ready', 'sync-game']),
  sender: z.string(),
  message: z.string(),
});

export const zodChatMessage = zodRoomMessage.extend({
  type: z.literal('chat'),
  messageType: z.enum(['presence', 'message']),
});
export type ChatMessage = z.infer<typeof zodChatMessage>;

export const syncGameMessage = zodRoomMessage.extend({
  type: z.literal('sync-game'),
  gameState: z.object({
    chestInfo: z.array(zodChestInfoKnownByPlayer),
    waitingFor: z.enum([
      WAITING_FOR_STATE.startGame,
      WAITING_FOR_STATE.NPutStone,
      WAITING_FOR_STATE.SPutStone,
      WAITING_FOR_STATE.NCheckChest,
      WAITING_FOR_STATE.SCheckChest,
      WAITING_FOR_STATE.restartGame,
    ]),
  }),
});
export type SyncGameMessage = z.infer<typeof syncGameMessage>;
