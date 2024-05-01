'use client';

import {useAtomValue} from 'jotai';
import {gameStateAtom} from '../contexts';

const GamePage = () => {
  const gameState = useAtomValue(gameStateAtom);

  console.log('gameState', gameState);

  return (
    <div>
      <p>{gameState?.waitingFor}</p>
    </div>
  );
};

export default GamePage;
