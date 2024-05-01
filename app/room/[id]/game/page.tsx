'use client';

import {useAtomValue} from 'jotai';
import {gameStateAtom} from '../contexts';
import {useState} from 'react';
import Chest from '../_components/Chest';
import {set} from 'lodash';

const GamePage = () => {
  const gameState = useAtomValue(gameStateAtom);
  const [selectedChest, setSelectedChest] = useState<number | null>(null);

  const handleClickChest = (index: number) => {
    if (selectedChest === index) setSelectedChest(null);
    else setSelectedChest(index);
  };

  return (
    <div className="space-y-4">
      <p className="alert alert-info">
        <span>{gameState?.waitingFor}</span>
      </p>

      <div className="flex items-center justify-center space-x-4">
        {gameState?.chestInfo.map((chest, index) => (
          <Chest
            key={index}
            gems={chest.gems}
            selected={selectedChest === index}
            onClick={() => handleClickChest(index)}
            checkedBy={chest.checkedBy?.position}
            stones={chest.stones.map(stone => stone.position)}
            number={chest.number || undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default GamePage;
