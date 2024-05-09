'use client';

import {useAtomValue} from 'jotai';
import {gameStateAtom} from '../contexts';
import {useEffect, useState} from 'react';
import {useCounter, useFullscreen} from '@mantine/hooks';

const MAX_RETRY = 3;

export default function Layout({children}: {children: React.ReactNode}) {
  const gameState = useAtomValue(gameStateAtom);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (gameState == null) {
      if (count < MAX_RETRY) {
        setLoading(true);
        (async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          setCount(count + 1);
        })();
      } else {
        throw new Error('Failed to load game state');
      }
    } else {
      setLoading(false);
    }
  }, [count, gameState]);

  return (
    <section>
      {loading ? <div className="loading loading-bars loading-lg" /> : children}
    </section>
  );
}
