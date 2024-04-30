import {PARTYKIT_URL} from '@/app/env';
import {StartGameDto} from '@/party/room/type';
import {WAITING_FOR_STATE} from '@/types/game';

export const startGame = async (roomId: string) => {
  const dto: StartGameDto = {
    command: WAITING_FOR_STATE.startGame,
  };
  await fetch(`${PARTYKIT_URL}/parties/room/${roomId}`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
};
