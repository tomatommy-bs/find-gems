'use client';

import {useAtomValue} from 'jotai';
import {gameStateAtom} from '../contexts';
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
            gems={chest.gems}
            selected={game.selectedChest === index}
            onClick={() => game.clickChest(index)}
            checkedBy={chest.checkedBy?.position}
            stones={chest.stones.map(stone => stone.position)}
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
          ok
        </button>
      </div>
    </div>
  );
};

export default GamePage;
