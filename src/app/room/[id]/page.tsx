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
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const myConnectionId = useMemo(() => {
    return ps?.id;
  }, [ps?.id]);

  const sendMessage = () => {
    const value = inputRef.current?.value;
    if (!!value) {
      ps?.send(value);
      inputRef.current!.value = '';
    }
  };

  const handleStartGame = () => {
    startGame(params.id);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="h-3/4 overflow-y-scroll  text-white">
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
              <div>
                <span>{msg.sender}</span>
                <p className="chat chat-start" key={i}>
                  <span className="chat-bubble">{msg.message}</span>
                </p>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <button className="btn btn-block" onClick={handleStartGame}>
        start game
      </button>
      <div className="flex">
        <Input ref={inputRef} placeholder="message" className="grow" />
        <button className="btn btn-primary" onClick={sendMessage}>
          <PaperAirplaneIcon className="w-12" />
        </button>
      </div>
    </div>
  );
}
