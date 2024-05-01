import {Player} from '@/functions/Player';
import z from 'zod';

/**
 * gem の配置パターン
 */
export type GemPattern = '0' | '1' | '2-I' | '2-L' | '3' | '4';

const zodGem = z.literal(0).or(z.literal(1));
export type Gem = z.infer<typeof zodGem>;

export const zodChestInfoKnownByPlayer = z.object({
  /** 宝石の配置 */
  gems: z.tuple([zodGem, zodGem]),
  stones: z.array(z.instanceof(Player)),
  /** そのチェストを調査したプレイヤー */
  checkedBy: z.instanceof(Player).nullable(),
  /** そのチェストに入っている宝石の数を知っているプレイヤー */
  number: z.number().nullable(),
});
export type ChestInfoKnownByPlayer = z.infer<typeof zodChestInfoKnownByPlayer>;

export const WAITING_FOR_STATE = {
  NCheckChest: 'NCheckChest',
  NPutStone: 'NPutStone',
  SCheckChest: 'SCheckChest',
  SPutStone: 'SPutStone',
  startGame: 'startGame',
  restartGame: 'restartGame',
} as const;
export type waitingForState =
  (typeof WAITING_FOR_STATE)[keyof typeof WAITING_FOR_STATE];

export const FORCE_CLIENT_ACT_MESSAGE = {
  jumpToGamePage: 'jumpToGamePage',
} as const;
export type ForceClientActMessage =
  (typeof FORCE_CLIENT_ACT_MESSAGE)[keyof typeof FORCE_CLIENT_ACT_MESSAGE];
