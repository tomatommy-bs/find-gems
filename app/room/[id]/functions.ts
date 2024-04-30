import {StartGameDto} from '@/party/room/type';

export const startGame = async (roomId: string) => {
  const dto: StartGameDto = {
    command: 'start-game',
  };
  const res = await fetch(`/api/room/${roomId}`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return res.json();
};
