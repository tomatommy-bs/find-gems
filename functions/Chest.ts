import {Gem, GemPattern} from '@/types/game';
import {ChestDirection} from './constants';
import {Player} from './Player';
import {shiftArray} from './utils';

/**
 * 下図は direction: 'NE' の場合のパターン
 *
 * 0:
 * x x
 * x x
 *
 * 1:
 * o x
 * x x
 *
 * 2-I:
 * o x
 * x o
 *
 * 2-L:
 * o o
 * x x
 *
 * 3:
 * o o
 * o x
 *
 * 4:
 * o o
 * o o
 */

type Direction = ChestDirection;

export class Chest {
  public readonly gemPattern: GemPattern;
  public readonly direction: Direction;
  public readonly stones: Player[] = [];
  public checkedBy: Player | null = null;
  private readonly patternNumberMap: Record<GemPattern, [Gem, Gem, Gem, Gem]> =
    {
      '0': [0, 0, 0, 0],
      '1': [1, 0, 0, 0],
      '2-I': [1, 0, 0, 1],
      '2-L': [1, 0, 1, 0],
      '3': [1, 1, 1, 0],
      '4': [1, 1, 1, 1],
    };
  private readonly rotateOnDirection: Record<Direction, number> = {
    NE: 0,
    SE: 1,
    SW: 2,
    NW: 3,
  };

  constructor(args: {pattern: GemPattern; direction: Direction}) {
    this.gemPattern = args.pattern;
    this.direction = args.direction;
  }

  public putStone(player: Player) {
    if (this.stones.length >= 2) throw new Error(`Chest already has 2 stones!`);

    if (this.stones.length === 1) {
      const topStone = this.getTopStone();
      if (topStone === player) throw new Error(`Player already put a stone!`);
    }

    this.stones.push(player);
  }

  public checkNumberOfGems(player: Player): number {
    if (this.checkedBy !== null)
      throw new Error(`Chest already checked by ${this.checkedBy}!`);
    this.checkedBy = player;
    return this.countNumberOfGems();
  }

  public countNumberOfGems() {
    const patternNumber = this.patternNumberMap[this.gemPattern];
    return patternNumber.filter(v => v === 1).length;
  }

  private getGemsOnDirection(): [Gem, Gem, Gem, Gem] {
    const rotate = this.rotateOnDirection[this.direction];
    /**
     * direction: 'NE' の場合の stones の並びかた.
     * [左上, 右上, 左下, 右下]
     */
    const stonesOnNE = this.patternNumberMap[this.gemPattern];
    return shiftArray(stonesOnNE, rotate) as [Gem, Gem, Gem, Gem];
  }

  public showGems(player: Player): [Gem, Gem] {
    const playerDirection = player.position;
    const gemsOnDirection = this.getGemsOnDirection();
    switch (playerDirection) {
      case 'N':
        return [gemsOnDirection[2], gemsOnDirection[3]];
      case 'S':
        return [gemsOnDirection[0], gemsOnDirection[1]];
    }
  }

  public getTopStone(): Player | null {
    if (this.stones.length === 0) return null;
    return this.stones[this.stones.length - 1];
  }

  public getBelongsTo(): Player | null {
    return this.getTopStone();
  }
}
