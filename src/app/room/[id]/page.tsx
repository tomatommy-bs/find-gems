'use client';

import {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import {startGame} from './functions';
import {useAtomValue} from 'jotai';
import {
  chatAtom,
  gameStateAtom,
  partySocketAtom,
  presenceAtom,
} from './contexts';

export default function RoomPage({params}: {params: {id: string}}) {
  const chats = useAtomValue(chatAtom);
  const ps = useAtomValue(partySocketAtom);
  const presence = useAtomValue(presenceAtom);

  const myConnectionId = useMemo(() => {
    return ps?.id;
  }, [ps?.id]);

  const handleStartGame = () => {
    startGame(params.id);
  };

  return (
    <div className="flex h-full flex-col justify-between space-y-4">
      <div className="grow overflow-y-scroll text-white">
        {chats.map((msg, i) => (
          <Fragment key={i}>
            {msg.messageType === 'presence' && (
              <p className="my-1 rounded-md bg-black bg-opacity-[0.2] text-center">
                {msg.message}
              </p>
            )}
            {msg.messageType === 'message' && msg.sender === myConnectionId && (
              <p className="chat chat-end" key={i}>
                <span className="chat-bubble">{msg.message}</span>
              </p>
            )}
            {msg.sender !== myConnectionId && msg.messageType === 'message' && (
              <p className="chat chat-start" key={i}>
                <span className="chat-bubble">{msg.message}</span>
              </p>
            )}
          </Fragment>
        ))}
      </div>

      <button
        className="btn btn-block"
        onClick={handleStartGame}
        disabled={presence.length < 2}
      >
        start game
      </button>
    </div>
  );
}
