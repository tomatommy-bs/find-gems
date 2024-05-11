import {WAITING_FOR_STATE, waitingForState} from '@/src/types/game';
import {Board} from './Board';
import _ from 'lodash';

const INITIAL_SCORE = {
  N: 0,
  S: 0,
};

export class GameMaster {
  private board: Board;
  public score = _.cloneDeep(INITIAL_SCORE);
  constructor() {
    this.board = new Board({isNPlayerFirst: this.decideFirstPlayerRandomly()});
  }

  public startGame() {
    const isNPlayerFirst = this.decideFirstPlayerRandomly();
    this.score = _.cloneDeep(INITIAL_SCORE);
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
    const wonBy = this.getWonBy();
    if (wonBy != null) {
      this.score[wonBy] += 1;
    }
  }

  public nextGame() {
    const wonBy = this.getWonBy();
    if (wonBy == null) throw new Error('The game is not finished yet.');
    const wonByN = wonBy === 'N';

    this.board = new Board({isNPlayerFirst: wonByN});
  }

  public getChestInfoByPlayer(playerPosition: 'N' | 'S') {
    const chestInfo = this.board.getChestInfoByPlayer(playerPosition);
    if (this.getWonBy() == null) {
      chestInfo.forEach(chest => delete chest.secretGems);
    }
    return chestInfo;
  }

  public whatShouldDoNext(): waitingForState {
    return this.board.waitingFor;
  }

  /**
   * @rules
   * 1. '2-I' と '2-L' を両方持っている方が勝ち
   * 2. いない場合, gems の合計数が多い方が勝ち,
   * 3. 同数の場合, 大きい gem を持っている方が勝ち
   */
  public getWonBy(): 'N' | 'S' | null {
    const {N, S} = this.board.getPlayersChest();
    if (N.length < 2 || S.length < 2) return null;
    const {N: NMax, S: SMax} = this.getPlayersMaxGem();
    const having2GemPlayer = this.getHaving2GemPlayer();
    const nScore = _.sum(N.map(chest => chest.getNumberOfGems()));
    const sScore = _.sum(S.map(chest => chest.getNumberOfGems()));
    if (having2GemPlayer != null) return having2GemPlayer;
    if (nScore > sScore) return 'N';
    if (nScore < sScore) return 'S';
    if ((NMax || 0) > (SMax || 0)) return 'N';
    if ((NMax || 0) < (SMax || 0)) return 'S';
    return null;
  }

  private getHaving2GemPlayer(): 'N' | 'S' | null {
    const {N, S} = this.board.getPlayersChest();
    if (N.length !== 2 || S.length !== 2) return null;

    if (N[0].getNumberOfGems() === 2 && N[1].getNumberOfGems() === 2)
      return 'N';
    if (S[0].getNumberOfGems() === 2 && S[1].getNumberOfGems() === 2)
      return 'S';
    return null;
  }

  private getPlayersMaxGem(): {N: number | null; S: number | null} {
    const {N, S} = this.board.getPlayersChest();
    const nMaxGem = Math.max(...N.map(chest => chest.getNumberOfGems()));
    const sMaxGem = Math.max(...S.map(chest => chest.getNumberOfGems()));
    return {N: nMaxGem, S: sMaxGem};
  }

  private decideFirstPlayerRandomly(): boolean {
    const isNPlayerFirst = Math.random() < 0.5;
    return isNPlayerFirst;
  }
}
