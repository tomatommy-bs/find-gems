'use client';

import {useAtomValue} from 'jotai';
import {gameStateAtom} from '../contexts';

const GamePage = () => {
  const gameState = useAtomValue(gameStateAtom);
  return (
    <div>
      <p>{gameState?.waitingFor}</p>
    </div>
  );
};

export default GamePage;
