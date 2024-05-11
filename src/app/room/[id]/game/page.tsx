'use client';

import {useAtomValue} from 'jotai';
import {gameStateAtom, presenceAtom} from '../contexts';
import {use, useState} from 'react';
import Chest from '../_components/Chest';
import {set} from 'lodash';
import {WAITING_FOR_STATE} from '@/src/types/game';
import {checkChest} from '../functions';
import {useGame} from './hooks';

const GamePage = ({params}: {params: {id: string}}) => {
  const id = params.id;
  const game = useGame({id});

  return (
    <div className="space-y-4">
      <p className="alert alert-info">
        <span>{game.commandMessage}</span>
      </p>

      <div className="flex justify-center space-x-4">
        {game.gameState?.chestInfo.map((chest, index) => (
          <Chest
            key={index}
            topGems={
              game.gameState?.position === 'N' ? chest.gems : chest.secretGems
            }
            bottomGems={
              game.gameState?.position === 'S' ? chest.gems : chest.secretGems
            }
            selected={game.selectedChest === index}
            onClick={() => game.clickChest(index)}
            checkedBy={chest.checkedBy}
            stones={chest.stones}
            number={chest.number}
            disabledChest={!game.canCheckChest}
            disabledStoneTop={!game.canPutTopStone[index]}
            disabledStoneBottom={!game.canPutBottomStone[index]}
          />
        ))}
      </div>
      <div className="text-center">
        <button
          className="btn btn-accent w-1/2"
          disabled={!game.canSubmit}
          onClick={game.submit}
        >
          {game.gameState?.waitingFor !== WAITING_FOR_STATE.nextGame
            ? 'ok'
            : 'start next game'}
        </button>
      </div>
    </div>
  );
};

export default GamePage;
