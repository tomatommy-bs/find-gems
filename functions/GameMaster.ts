import {WAITING_FOR_STATE, waitingForState} from '@/types/game';
import {Board} from './Board';

export class GameMaster {
  private board: Board;
  constructor() {
    this.board = new Board({isNPlayerFirst: this.decideFirstPlayerRandomly()});
  }

  public startGame() {
    const isNPlayerFirst = this.decideFirstPlayerRandomly();
    this.board = new Board({isNPlayerFirst});
  }

  public checkChest(playerPosition: 'N' | 'S', chestIndex: number) {
    if (
      playerPosition === 'N' &&
      this.board.waitingFor !== WAITING_FOR_STATE.NCheckChest
    )
      throw new Error("It's not your turn to check the chest");
    if (
      playerPosition === 'S' &&
      this.board.waitingFor !== WAITING_FOR_STATE.SCheckChest
    )
      throw new Error("It's not your turn to check the chest");

    return this.board.checkNumberOfGemsInAChest(chestIndex, playerPosition);
  }

  public putStone(playerPosition: 'N' | 'S', chestIndex: number) {
    if (
      playerPosition === 'N' &&
      this.board.waitingFor !== WAITING_FOR_STATE.NPutStone
    )
      throw new Error("It's not your turn to put the stone");
    if (
      playerPosition === 'S' &&
      this.board.waitingFor !== WAITING_FOR_STATE.SPutStone
    )
      throw new Error("It's not your turn to put the stone");

    this.board.putStoneOnChest(chestIndex, playerPosition);
  }

  public getChestInfoByPlayer(playerPosition: 'N' | 'S') {
    return this.board.getChestInfoByPlayer(playerPosition);
  }

  public whatShouldDoNext(): waitingForState {
    return this.board.waitingFor;
  }

  private decideFirstPlayerRandomly(): boolean {
    const isNPlayerFirst = Math.random() < 0.5;
    return isNPlayerFirst;
  }
}
