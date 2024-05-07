'use client';

import {PARTYKIT_HOST, PARTYKIT_URL} from '@/src/app/env';
import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import Input from '@/src/components/Input';
import {
  ArrowLeftStartOnRectangleIcon,
  PaperAirplaneIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/16/solid';
import usePartySocket from 'partysocket/react';
import {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import {ChatMessage, RoomMessage, SyncGameMessage} from '@/src/party/room/type';
import {startGame} from './functions';
import {useAtomValue} from 'jotai';
import {chatAtom, gameStateAtom, partySocketAtom} from './contexts';
import {useRouter} from 'next/navigation';

export default function RoomPage({params}: {params: {id: string}}) {
  const chats = useAtomValue(chatAtom);
  const ps = useAtomValue(partySocketAtom);

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

      <button className="btn btn-block" onClick={handleStartGame}>
        start game
      </button>
    </div>
  );
}
