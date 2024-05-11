import {WAITING_FOR_STATE, waitingForState} from '@/src/types/game';
import {Board} from './Board';
import _ from 'lodash';
import {Player, PLAYER_POSITION, PlayerPosition} from './Player';

const INITIAL_SCORE = {
  N: 0,
  S: 0,
};

export class GameMaster {
  private board: Board;
  public playerOnN: Player = new Player({name: 'N', position: 'N'});
  public playerOnS: Player = new Player({name: 'S', position: 'S'});
  private waitingFor: waitingForState = WAITING_FOR_STATE.startGame;
  private isNPlayerFirst = this.decideFirstPlayerRandomly();
  public score = _.cloneDeep(INITIAL_SCORE);

  constructor() {
    this.board = new Board();
  }

  public startGame(args: {players: {name?: string; id?: string}[]}) {
    if (args.players.length !== 2)
      throw new Error('The number of players must be 2');
    const players = _.shuffle(args.players);
    this.playerOnN = new Player({
      name: players[0].name ?? 'N',
      position: PLAYER_POSITION.N,
      id: players[0].id,
    });
    this.playerOnS = new Player({
      name: players[1].name ?? 'S',
      position: PLAYER_POSITION.S,
      id: players[1].id,
    });
    this.score = _.cloneDeep(INITIAL_SCORE);
    this.board = new Board();
    this.updateWaitingForState();
  }

  public checkChest(playerPosition: PlayerPosition, chestIndex: number) {
    if (
      playerPosition === PLAYER_POSITION.N &&
      this.waitingFor !== WAITING_FOR_STATE.NCheckChest
    )
      throw new Error("It's not your turn to check the chest");
    if (
      playerPosition === PLAYER_POSITION.S &&
      this.waitingFor !== WAITING_FOR_STATE.SCheckChest
    )
      throw new Error("It's not your turn to check the chest");

    this.board.checkNumberOfGemsInAChest(chestIndex, playerPosition);
    this.updateWaitingForState();
  }

  public putStone(playerPosition: PlayerPosition, chestIndex: number) {
    if (
      playerPosition === PLAYER_POSITION.N &&
      this.waitingFor !== WAITING_FOR_STATE.NPutStone
    )
      throw new Error("It's not your turn to put the stone");
    if (
      playerPosition === PLAYER_POSITION.S &&
      this.waitingFor !== WAITING_FOR_STATE.SPutStone
    )
      throw new Error("It's not your turn to put the stone");

    this.board.putStoneOnChest(chestIndex, playerPosition);
    const wonBy = this.getWonBy();
    if (wonBy != null) {
      this.score[wonBy] += 1;
    }
    this.updateWaitingForState();
  }

  public nextGame() {
    const wonBy = this.getWonBy();
    if (wonBy == null) throw new Error('The game is not finished yet.');
    this.isNPlayerFirst = wonBy === PLAYER_POSITION.N;
    this.board = new Board();
    this.updateWaitingForState();
  }

  public getChestInfoByPlayer(playerPosition: PlayerPosition) {
    const player =
      playerPosition === PLAYER_POSITION.N ? this.playerOnN : this.playerOnS;
    return this.board.chests.map(chest => ({
      gems: chest.showGems(player.position).visible,
      secretGems: chest.showGems(player.position).secret,
      stones: chest.stones,
      checkedBy: chest.checkedBy,
      number:
        chest.checkedBy === player.position ? chest.getNumberOfGems() : null,
    }));
  }

  public whatShouldDoNext(): waitingForState {
    return this.waitingFor;
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

  private updateWaitingForState(): void {
    const numberOfCheckedChest =
      this.board.getCheckedChests(PLAYER_POSITION.N).length +
      this.board.getCheckedChests(PLAYER_POSITION.S).length;
    const numberOfStonesOnChests = _.sumBy(
      this.board.chests,
      chest => chest.stones.length
    );
    const numberOfChestOfNPlayer = this.board.chests.filter(
      chest => chest.getBelongsTo() === PLAYER_POSITION.N
    ).length;
    const numberOfChestOfSPlayer = this.board.chests.filter(
      chest => chest.getBelongsTo() === PLAYER_POSITION.S
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

  private getPlayersChest() {
    const N = this.board.chests.filter(
      chest => chest.getBelongsTo() === PLAYER_POSITION.N
    );
    const S = this.board.chests.filter(
      chest => chest.getBelongsTo() === PLAYER_POSITION.S
    );
    return {N, S};
  }
}
