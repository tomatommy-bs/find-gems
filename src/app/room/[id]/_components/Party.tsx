import {useSetAtom} from 'jotai';
import usePartySocket from 'partysocket/react';
import {
  chatAtom,
  gameStateAtom,
  partySocketAtom,
  presenceAtom,
} from '../contexts';
import {PARTYKIT_HOST} from '@/src/app/env';
import {
  ChatMessage,
  JoinRoomMessageDto,
  ROOM_MESSAGE_TYPE,
  RoomMessage,
  SyncGameMessage,
  SyncPresenceMessage,
} from '@/src/party/room/type';
import {FORCE_CLIENT_ACT_MESSAGE} from '@/src/types/game';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';

interface Props {
  id: string;
}

const Party: React.FC<Props> = props => {
  const {id} = props;
  const setChatAtom = useSetAtom(chatAtom);
  const setGameState = useSetAtom(gameStateAtom);
  const setPartySocket = useSetAtom(partySocketAtom);
  const setPresence = useSetAtom(presenceAtom);
  const router = useRouter();
  const name = Cookies.get('name') ?? '';

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
        case ROOM_MESSAGE_TYPE.syncPresence:
          setPresence((data as SyncPresenceMessage).users);
        case ROOM_MESSAGE_TYPE.forceClient:
          switch (data.message) {
            case FORCE_CLIENT_ACT_MESSAGE.jumpToGamePage:
              router.replace(`/room/${id}/game`);
              break;
          }
      }
    },
    onOpen: () => {
      const data: JoinRoomMessageDto = {
        name: name,
        type: ROOM_MESSAGE_TYPE.join,
      };
      ws.send(JSON.stringify(data));
    },
  });
  setPartySocket(ws);

  return null;
};

export default Party;
