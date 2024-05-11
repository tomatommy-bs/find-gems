import {Player} from '@/src/functions/Player';
import z from 'zod';

/**
 * gem の配置パターン
 */
export type GemPattern = '0' | '1' | '2-I' | '2-L' | '3' | '4';

const zodGem = z.literal(0).or(z.literal(1));
export type Gem = z.infer<typeof zodGem>;

const zodPlayerPosition = z.literal('N').or(z.literal('S'));
export type PlayerPosition = z.infer<typeof zodPlayerPosition>;

const zodStone = zodPlayerPosition;
export type Stone = z.infer<typeof zodStone>;

export const zodChestInfoKnownByPlayer = z.object({
  /** 宝石の配置 */
  gems: z.tuple([zodGem, zodGem]),
  secretGems: z.tuple([zodGem, zodGem]).optional(),
  stones: z.array(zodStone),
  /** そのチェストを調査したプレイヤー */
  checkedBy: zodPlayerPosition.optional(),
  /** そのチェストに入っている宝石の数 */
  number: z.number().optional(),
});
export type ChestInfoKnownByPlayer = z.infer<typeof zodChestInfoKnownByPlayer>;

export const WAITING_FOR_STATE = {
  NCheckChest: 'NCheckChest',
  NPutStone: 'NPutStone',
  SCheckChest: 'SCheckChest',
  SPutStone: 'SPutStone',
  startGame: 'startGame',
  nextGame: 'nextGame',
  restartGame: 'restartGame',
} as const;
export type waitingForState =
  (typeof WAITING_FOR_STATE)[keyof typeof WAITING_FOR_STATE];

export const FORCE_CLIENT_ACT_MESSAGE = {
  jumpToGamePage: 'jumpToGamePage',
} as const;
export type ForceClientActMessage =
  (typeof FORCE_CLIENT_ACT_MESSAGE)[keyof typeof FORCE_CLIENT_ACT_MESSAGE];
