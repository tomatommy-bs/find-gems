'use client';

import {useAtomValue} from 'jotai';
import {gameStateAtom} from '../contexts';
import {useState} from 'react';
import Chest from '../_components/Chest';
import {set} from 'lodash';
import {WAITING_FOR_STATE} from '@/src/types/game';
import {checkChest} from '../functions';

const GamePage = ({params}: {params: {id: string}}) => {
  const id = params.id;
  const gameState = useAtomValue(gameStateAtom);
  const [selectedChest, setSelectedChest] = useState<number | null>(null);
  const position = gameState?.position;
  const canDoAction = judgeCanDoAction(gameState?.waitingFor, position);

  const handleClickChest = (index: number) => {
    if (selectedChest === index) setSelectedChest(null);
    else setSelectedChest(index);
  };

  const handleSubmit = () => {
    checkChest(id, selectedChest!, position!);
  };

  return (
    <div className="space-y-4">
      <p className="alert alert-info">
        <span>{convertWaitingForToMessage(gameState?.waitingFor)}</span>
      </p>

      <div className="flex justify-center space-x-4">
        {gameState?.chestInfo.map((chest, index) => (
          <Chest
            key={index}
            gems={chest.gems}
            selected={selectedChest === index}
            onClick={() => handleClickChest(index)}
            checkedBy={chest.checkedBy?.position}
            stones={chest.stones.map(stone => stone.position)}
            number={chest.number || undefined}
            disabled={!canDoAction.check}
          />
        ))}
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary w-1/2"
          disabled={selectedChest == null}
          onClick={handleSubmit}
        >
          ok
        </button>
      </div>
    </div>
  );
};

const convertWaitingForToMessage = (waitingFor?: string) => {
  switch (waitingFor) {
    case WAITING_FOR_STATE.NCheckChest:
      return 'N player, please check a chest';
    case WAITING_FOR_STATE.SCheckChest:
      return 'S player, please check a chest';
    case WAITING_FOR_STATE.NPutStone:
      return 'N player, please put a stone';
    case WAITING_FOR_STATE.SPutStone:
      return 'S player, please put a stone';
    case WAITING_FOR_STATE.restartGame:
      return 'Game is over. Please restart the game';
  }
};

const judgeCanDoAction = (
  waitingFor?: string,
  position?: string
): {check: boolean; putStone: boolean} => {
  switch (waitingFor) {
    case WAITING_FOR_STATE.NCheckChest:
      return {check: position === 'N', putStone: false};
    case WAITING_FOR_STATE.SCheckChest:
      return {check: position === 'S', putStone: false};
    case WAITING_FOR_STATE.NPutStone:
      return {check: false, putStone: position === 'N'};
    case WAITING_FOR_STATE.SPutStone:
      return {check: false, putStone: position === 'S'};
    default:
      return {check: false, putStone: false};
  }
};

export default GamePage;
