import {Gem, GemPattern} from '@/src/types/game';
import {ChestDirection} from './constants';
import {shiftArray} from './utils';
import {PlayerPosition} from './Player';

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
  public readonly stones: PlayerPosition[] = [];
  public checkedBy?: PlayerPosition = undefined;
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

  public putStone(player: PlayerPosition) {
    if (this.stones.length >= 2) throw new Error(`Chest already has 2 stones!`);

    if (this.stones.length === 1) {
      const topStone = this.getTopStone();
      if (topStone === player) throw new Error(`Player already put a stone!`);
    }

    this.stones.push(player);
  }

  public checkNumberOfGems(player: PlayerPosition): number {
    if (this.checkedBy != undefined)
      throw new Error(`Chest already checked by ${this.checkedBy}!`);
    this.checkedBy = player;
    return this.getNumberOfGems();
  }

  public getNumberOfGems() {
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

  public showGems(player: PlayerPosition): {
    visible: [Gem, Gem];
    secret?: [Gem, Gem];
  } {
    const gemsOnDirection = this.getGemsOnDirection();
    switch (player) {
      case 'N':
        return {
          visible: [gemsOnDirection[2], gemsOnDirection[3]],
          secret: [gemsOnDirection[0], gemsOnDirection[1]],
        };
      case 'S':
        return {
          visible: [gemsOnDirection[0], gemsOnDirection[1]],
          secret: [gemsOnDirection[2], gemsOnDirection[3]],
        };
    }
  }

  public getTopStone(): PlayerPosition | null {
    if (this.stones.length === 0) return null;
    return this.stones[this.stones.length - 1];
  }

  public getBelongsTo(): PlayerPosition | null {
    return this.getTopStone();
  }
}
