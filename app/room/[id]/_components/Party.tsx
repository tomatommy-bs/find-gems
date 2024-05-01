import {useSetAtom} from 'jotai';
import usePartySocket from 'partysocket/react';
import {chatAtom, gameStateAtom, partySocketAtom} from '../contexts';
import {PARTYKIT_HOST} from '@/app/env';
import {
  ChatMessage,
  ROOM_MESSAGE_TYPE,
  RoomMessage,
  SyncGameMessage,
} from '@/party/room/type';
import {FORCE_CLIENT_ACT_MESSAGE} from '@/types/game';
import {useRouter} from 'next/navigation';

interface Props {
  id: string;
}

const Party: React.FC<Props> = props => {
  const {id} = props;
  const setChatAtom = useSetAtom(chatAtom);
  const setGameState = useSetAtom(gameStateAtom);
  const setPartySocket = useSetAtom(partySocketAtom);
  const router = useRouter();

  const ws = usePartySocket({
    host: PARTYKIT_HOST,
    party: 'room',
    room: id,
    onMessage: msg => {
      const data = JSON.parse(msg.data) as RoomMessage;
      switch (data.type) {
        case ROOM_MESSAGE_TYPE.chat:
          setChatAtom(msgs => [...msgs, data as ChatMessage]);
          break;
        case ROOM_MESSAGE_TYPE.syncGame:
          setGameState((data as SyncGameMessage).gameState);
          break;
        case ROOM_MESSAGE_TYPE.forceClient:
          switch (data.message) {
            case FORCE_CLIENT_ACT_MESSAGE.jumpToGamePage:
              router.replace(`/room/${id}/game`);
              break;
          }
      }
      console.info(data);
    },
  });
  setPartySocket(ws);

  return <>{ws.id}</>;
};

export default Party;
