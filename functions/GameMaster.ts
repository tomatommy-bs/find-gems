import {Board} from './Board';

export class GameMaster {
  public waitingForState:
    | 'NCheckChest'
    | 'NPutStone'
    | 'SCheckChest'
    | 'SPutStone'
    | 'startGame' = 'startGame';

  private board: Board;
  constructor() {
    this.board = new Board({isNPlayerFirst: true});
  }

  public startGame() {
    const isNPlayerFirst = this.decideFirstPlayerRandomly();
    this.board = new Board({isNPlayerFirst});
  }

  public whatShouldDoNext(): string {
    return this.board.whatShouldDoNext();
  }

  private decideFirstPlayerRandomly(): boolean {
    const isNPlayerFirst = Math.random() < 0.5;
    return isNPlayerFirst;
  }
}
