'use client';

import {PARTYKIT_HOST, PARTYKIT_URL} from '@/app/env';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
import {
  ArrowLeftStartOnRectangleIcon,
  PaperAirplaneIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/16/solid';
import usePartySocket from 'partysocket/react';
import {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import {ChatMessage, RoomMessage, SyncGameMessage} from '@/party/room/type';
import {startGame} from './functions';

export default function RoomPage({params}: {params: {id: string}}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [gameState, setGameState] = useState<
    SyncGameMessage['gameState'] | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ws = usePartySocket({
    host: PARTYKIT_HOST,
    party: 'room',
    room: params.id,
    onMessage: msg => {
      const data = JSON.parse(msg.data) as RoomMessage;
      if (data.type === 'chat') {
        setMessages(msgs => [...msgs, data as ChatMessage]);
      }
      if (data.type === 'sync-game') {
        setGameState((data as SyncGameMessage).gameState);
      }
    },
  });
  const myConnectionId = useMemo(() => {
    return ws.id;
  }, [ws.id]);

  const sendMessage = () => {
    const value = inputRef.current?.value;
    if (!!value) {
      ws.send(value);
      inputRef.current!.value = '';
    }
  };

  const handleStartGame = () => {
    startGame(params.id);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="h-3/4 overflow-y-scroll  text-white">
        {messages.map((msg, i) => (
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
