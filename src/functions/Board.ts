import {
  ChestInfoKnownByPlayer,
  Gem,
  WAITING_FOR_STATE,
  waitingForState,
} from '@/src/types/game';
import {CHEST_DIRECTION, ChestDirection} from './constants';
import {Player, PLAYER_POSITION, PlayerPosition} from './Player';
import {Chest} from './Chest';
import _ from 'lodash';

export class Board {
  public readonly chests: [Chest, Chest, Chest, Chest, Chest, Chest];

  constructor() {
    this.chests = _.shuffle([
      new Chest({pattern: '0', direction: this.getShuffledDirection()}),
      new Chest({pattern: '1', direction: this.getShuffledDirection()}),
      new Chest({pattern: '2-I', direction: this.getShuffledDirection()}),
      new Chest({pattern: '2-L', direction: this.getShuffledDirection()}),
      new Chest({pattern: '3', direction: this.getShuffledDirection()}),
      new Chest({pattern: '4', direction: this.getShuffledDirection()}),
    ]) as [Chest, Chest, Chest, Chest, Chest, Chest];
  }

  /**
   * プレイヤーがある宝箱に入っている宝石の数を確認する
   */
  public checkNumberOfGemsInAChest(
    chestIndex: number,
    playerPosition: PlayerPosition
  ) {
    const chest = this.chests[chestIndex];
    const checkedChests = this.getCheckedChests(playerPosition);
    if (1 < checkedChests.length)
      throw new Error(
        `Player ${playerPosition} has already checked other one chest!`
      );

    chest.checkNumberOfGems(playerPosition);
  }

  /**
   * プレイヤーから見える宝箱の情報を取得する
   */
  public getChestInfoByPlayer(
    player: PlayerPosition
  ): ChestInfoKnownByPlayer[] {
    return this.chests.map(chest => ({
      gems: chest.showGems(player).visible,
      secretGems: chest.showGems(player).secret,
      stones: chest.stones,
      checkedBy: chest.checkedBy,
      number: chest.checkedBy === player ? chest.getNumberOfGems() : undefined,
    }));
  }

  /**
   * プレイヤーが宝箱に石を置く
   */
  public putStoneOnChest(chestIndex: number, playerPosition: PlayerPosition) {
    const chest = this.chests[chestIndex];
    chest.putStone(playerPosition);
  }

  public getPlayersChest() {
    const N = this.chests.filter(
      chest => chest.getBelongsTo() === PLAYER_POSITION.N
    );
    const S = this.chests.filter(
      chest => chest.getBelongsTo() === PLAYER_POSITION.S
    );
    return {N, S};
  }

  public getCheckedChests(playerPosition: PlayerPosition): Chest[] {
    return this.chests.filter(chest => chest.checkedBy === playerPosition);
  }

  private getShuffledDirection(): ChestDirection {
    return _.shuffle([
      CHEST_DIRECTION.NE,
      CHEST_DIRECTION.NW,
      CHEST_DIRECTION.SE,
      CHEST_DIRECTION.SW,
    ])[0];
  }
}
