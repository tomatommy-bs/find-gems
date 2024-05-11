import {useAtomValue} from 'jotai';
import {gameStateAtom, presenceAtom} from '../contexts';
import {useState} from 'react';
import {
  ChestInfoKnownByPlayer,
  PlayerPosition,
  WAITING_FOR_STATE,
} from '@/src/types/game';
import {checkChest, nextGame, putStone} from '../functions';
import {Chest} from '@/src/functions/Chest';
import {PLAYER_POSITION} from '@/src/functions/Player';

export const useGame = (args: {id: string}) => {
  const {id} = args;
  const gameState = useAtomValue(gameStateAtom);
  const presence = useAtomValue(presenceAtom);
  const [selectedChest, setSelectedChest] = useState<number | null>(null);
  const position = gameState?.position;
  const canDoAction = judgeCanDoAction({
    waitingFor: gameState?.waitingFor,
    position,
    chests: gameState?.chestInfo,
  });

  const clickChest = (index: number) => {
    if (selectedChest === index) setSelectedChest(null);
    else setSelectedChest(index);
  };

  const submit = () => {
    switch (gameState?.waitingFor) {
      case WAITING_FOR_STATE.NCheckChest:
      case WAITING_FOR_STATE.SCheckChest:
        checkChest(id, selectedChest!, position!);
        break;
      case WAITING_FOR_STATE.NPutStone:
      case WAITING_FOR_STATE.SPutStone:
        putStone(id, selectedChest!, position!);
        break;
      case WAITING_FOR_STATE.nextGame:
        nextGame(id);
        break;
    }
    setSelectedChest(null);
  };

  return {
    gameState,
    commandMessage: convertWaitingForToMessage({
      waitingFor: gameState?.waitingFor,
      nPlayerName: presence.find(p => p.position === 'N')?.name,
      sPlayerName: presence.find(p => p.position === 'S')?.name,
      wonBy: gameState?.wonBy,
    }),
    selectedChest,
    canCheckChest: canDoAction.check,
    canPutTopStone: canDoAction.putTopStone,
    canPutBottomStone: canDoAction.putBottomStone,
    canSubmit:
      selectedChest != null ||
      gameState?.waitingFor === WAITING_FOR_STATE.nextGame,
    clickChest,
    submit,
  };
};

const convertWaitingForToMessage = (args: {
  waitingFor?: string;
  nPlayerName?: string;
  sPlayerName?: string;
  wonBy?: PlayerPosition;
}) => {
  const {waitingFor, nPlayerName, sPlayerName, wonBy} = args;
  const name: Record<PlayerPosition, string | undefined> = {
    N: nPlayerName,
    S: sPlayerName,
  };
  switch (waitingFor) {
    case WAITING_FOR_STATE.NCheckChest:
      return `${nPlayerName}, please check a chest`;
    case WAITING_FOR_STATE.SCheckChest:
      return `${sPlayerName}, please check a chest`;
    case WAITING_FOR_STATE.NPutStone:
      return `${nPlayerName}, please put a stone`;
    case WAITING_FOR_STATE.SPutStone:
      return `${sPlayerName}, please put a stone`;
    case WAITING_FOR_STATE.restartGame:
      return 'Game is over. Please restart the game';
    case WAITING_FOR_STATE.nextGame:
      return `Won by ${name[wonBy!]} 🎉 Please start the next game`;
    case WAITING_FOR_STATE.startGame:
      return 'please start the game';
  }
};

const judgeCanDoAction = (args: {
  waitingFor?: string;
  position?: string;
  chests?: ChestInfoKnownByPlayer[];
}): {check: boolean; putTopStone: boolean[]; putBottomStone: boolean[]} => {
  const {waitingFor, position} = args;
  const filledFalse = Array<boolean>(6).fill(false);
  switch (waitingFor) {
    case WAITING_FOR_STATE.NCheckChest:
      return {
        check: position === PLAYER_POSITION.N,
        putTopStone: filledFalse,
        putBottomStone: filledFalse,
      };
    case WAITING_FOR_STATE.SCheckChest:
      return {
        check: position === PLAYER_POSITION.S,
        putTopStone: filledFalse,
        putBottomStone: filledFalse,
      };
    case WAITING_FOR_STATE.NPutStone: {
      if (position === PLAYER_POSITION.S)
        return {
          check: false,
          putTopStone: filledFalse,
          putBottomStone: filledFalse,
        };
      if (position === PLAYER_POSITION.N) {
        const putTopStone =
          args.chests?.map(
            chest =>
              chest.stones[0] != undefined &&
              chest.stones[0] === PLAYER_POSITION.S
          ) ?? filledFalse;
        const putBottomStone =
          args.chests?.map(chest => chest.stones[0] == undefined) ??
          filledFalse;
        return {check: false, putTopStone, putBottomStone};
      }
    }
    case WAITING_FOR_STATE.SPutStone:
      if (position === PLAYER_POSITION.N)
        return {
          check: false,
          putTopStone: filledFalse,
          putBottomStone: filledFalse,
        };
      if (position === PLAYER_POSITION.S) {
        const putTopStone =
          args.chests?.map(
            chest =>
              chest.stones[0] != undefined &&
              chest.stones[0] === PLAYER_POSITION.N
          ) ?? filledFalse;
        const putBottomStone =
          args.chests?.map(chest => chest.stones[0] == undefined) ??
          filledFalse;
        return {check: false, putTopStone, putBottomStone};
      }
    default:
      return {
        check: false,
        putBottomStone: filledFalse,
        putTopStone: filledFalse,
      };
  }
};
