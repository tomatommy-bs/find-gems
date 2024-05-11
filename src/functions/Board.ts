import {
  ChestInfoKnownByPlayer,
  Gem,
  WAITING_FOR_STATE,
  waitingForState,
} from '@/src/types/game';
import {CHEST_DIRECTION, ChestDirection} from './constants';
import {Player} from './Player';
import {Chest} from './Chest';
import _ from 'lodash';

const SHOULD_DO_NEXT = {
  CHECK_CHEST_N: 'please N player check a chest',
  CHECK_CHEST_S: 'please S player check a chest',
  PUT_STONE_N: 'please N player put a stone on a chest',
  PUT_STONE_S: 'please S player put a stone on a chest',
  END: 'game end',
};

export class Board {
  public readonly chests: [Chest, Chest, Chest, Chest, Chest, Chest];
  public playerOnN: Player = new Player({name: 'N', position: 'N'});
  public playerOnS: Player = new Player({name: 'S', position: 'S'});
  public readonly isNPlayerFirst: boolean;
  public waitingFor: waitingForState = WAITING_FOR_STATE.startGame;

  constructor(args: {isNPlayerFirst: boolean}) {
    this.chests = _.shuffle([
      new Chest({pattern: '0', direction: this.getShuffledDirection()}),
      new Chest({pattern: '1', direction: this.getShuffledDirection()}),
      new Chest({pattern: '2-I', direction: this.getShuffledDirection()}),
      new Chest({pattern: '2-L', direction: this.getShuffledDirection()}),
      new Chest({pattern: '3', direction: this.getShuffledDirection()}),
      new Chest({pattern: '4', direction: this.getShuffledDirection()}),
    ]) as [Chest, Chest, Chest, Chest, Chest, Chest];
    this.isNPlayerFirst = args.isNPlayerFirst;
    this.updateWaitingForState();
  }

  /**
   * プレイヤーがある宝箱に入っている宝石の数を確認する
   */
  public checkNumberOfGemsInAChest(
    chestIndex: number,
    playerPosition: 'N' | 'S'
  ) {
    const player = playerPosition === 'N' ? this.playerOnN : this.playerOnS;
    const chest = this.chests[chestIndex];
    const checkedChests = this.getCheckedChests(playerPosition);
    if (1 < checkedChests.length)
      throw new Error(
        `Player ${playerPosition} has already checked other one chest!`
      );

    chest.checkNumberOfGems(player);
    this.updateWaitingForState();
  }

  /**
   * プレイヤーから見える宝箱の情報を取得する
   */
  public getChestInfoByPlayer(
    playerPosition: 'N' | 'S'
  ): ChestInfoKnownByPlayer[] {
    const player = playerPosition === 'N' ? this.playerOnN : this.playerOnS;
    return this.chests.map(chest => ({
      gems: chest.showGems(player).visible,
      secretGems: chest.showGems(player).secret,
      stones: chest.stones,
      checkedBy: chest.checkedBy,
      number: chest.checkedBy === player ? chest.getNumberOfGems() : null,
    }));
  }

  /**
   * プレイヤーが宝箱に石を置く
   */
  public putStoneOnChest(chestIndex: number, playerPosition: 'N' | 'S') {
    const chest = this.chests[chestIndex];
    const player = playerPosition === 'N' ? this.playerOnN : this.playerOnS;
    chest.putStone(player);
    this.updateWaitingForState();
  }

  public updateWaitingForState(): void {
    const numberOfCheckedChest =
      this.getCheckedChests('N').length + this.getCheckedChests('S').length;
    const numberOfStonesOnChests = _.sumBy(
      this.chests,
      chest => chest.stones.length
    );
    const numberOfChestOfNPlayer = this.chests.filter(
      chest => chest.getBelongsTo()?.position === 'N'
    ).length;
    const numberOfChestOfSPlayer = this.chests.filter(
      chest => chest.getBelongsTo()?.position === 'S'
    ).length;

    if (this.isFinished()) {
      this.waitingFor = WAITING_FOR_STATE.nextGame;
      return;
    }

    switch (numberOfCheckedChest) {
      case 0:
        this.waitingFor = this.isNPlayerFirst
          ? WAITING_FOR_STATE.NCheckChest
          : WAITING_FOR_STATE.SCheckChest;
        return;
      case 1:
        this.waitingFor = this.isNPlayerFirst
          ? WAITING_FOR_STATE.SCheckChest
          : WAITING_FOR_STATE.NCheckChest;
        return;
      case 2:
        break;
    }

    let isTurnOfNPlayer = this.isNPlayerFirst;
    if (numberOfStonesOnChests % 2 !== 0) isTurnOfNPlayer = !isTurnOfNPlayer;
    switch (isTurnOfNPlayer) {
      case true:
        if (numberOfChestOfNPlayer === 2) isTurnOfNPlayer = !isTurnOfNPlayer;
        break;
      case false:
        this.waitingFor = WAITING_FOR_STATE.SPutStone;
        if (numberOfChestOfSPlayer === 2) isTurnOfNPlayer = !isTurnOfNPlayer;
        break;
    }

    this.waitingFor = isTurnOfNPlayer
      ? WAITING_FOR_STATE.NPutStone
      : WAITING_FOR_STATE.SPutStone;
  }

  public isFinished(): boolean {
    const {N, S} = this.getPlayersChest();
    return N.length + S.length === 4;
  }

  public getPlayersChest() {
    const N = this.chests.filter(
      chest => chest.getBelongsTo()?.position === 'N'
    );
    const S = this.chests.filter(
      chest => chest.getBelongsTo()?.position === 'S'
    );
    return {N, S};
  }

  private getCheckedChests(playerPosition: 'N' | 'S'): Chest[] {
    return this.chests.filter(
      chest => chest.checkedBy?.position === playerPosition
    );
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
