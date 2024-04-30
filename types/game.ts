import {Player} from '@/functions/Player';

/**
 * gem の配置パターン
 */
export type GemPattern = '0' | '1' | '2-I' | '2-L' | '3' | '4';
export type Gem = 0 | 1;

/**
 * ユーザーから見える宝箱の情報
 */
export type ChestInfoKnownByPlayer = {
  /** 宝石の配置 */
  gems: [Gem, Gem];
  /** 石の配置 */
  stones: Player[];
  /** チェック済みかどうか */
  checkedBy: Player | null;
  /** 宝石の数 */
  number: number | null;
};
