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

import PartySocket from 'partysocket';
import usePartySocket from 'partysocket/react';
import useWebSocket from 'partysocket/use-ws';
import {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import {ChatMessage} from './types';
import {timeStamp} from 'console';

export default function RoomPage({params}: {params: {id: string}}) {
  const [messages, setMessages] = useState<MessageEvent<ChatMessage>[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const ws = usePartySocket({
    host: PARTYKIT_HOST,
    party: 'room',
    room: params.id,
    onMessage: msg => {
      const newMessage = {
        ...msg,
        timeStamp: msg.timeStamp,
        data: JSON.parse(msg.data),
      };
      setMessages(msgs => [...msgs, newMessage]);
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

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="h-3/4 overflow-y-scroll  text-white">
        {messages.map((msg, i) => (
          <Fragment key={i}>
            {msg.data.sender === 'system' && (
              <p className="my-1 rounded-md bg-black bg-opacity-[0.2] text-center">
                {msg.data.message}
              </p>
            )}
            {msg.data.sender === myConnectionId && (
              <p className="chat chat-end" key={msg.timeStamp}>
                <span className="chat-bubble">{msg.data.message}</span>
              </p>
            )}
            {msg.data.sender !== myConnectionId &&
              msg.data.sender !== 'system' && (
                <div>
                  <span>{msg.data.sender}</span>
                  <p className="chat chat-start" key={msg.timeStamp}>
                    <span className="chat-bubble">{msg.data.message}</span>
                  </p>
                </div>
              )}
          </Fragment>
        ))}
      </div>

      <div className="flex">
        <Input ref={inputRef} placeholder="message" className="grow" />
        <button className="btn btn-primary" onClick={sendMessage}>
          <PaperAirplaneIcon className="w-12" />
        </button>
      </div>
    </div>
  );
}
