import {PARTYKIT_URL} from '@/app/env';
import {Player} from '@/functions/Player';
import {CheckChestDto, StartGameDto} from '@/party/room/type';
import {WAITING_FOR_STATE} from '@/types/game';
import {redirect} from 'next/navigation';

export const startGame = async (roomId: string) => {
  const dto: StartGameDto = {
    command: WAITING_FOR_STATE.startGame,
  };
  try {
    await fetch(`${PARTYKIT_URL}/parties/room/${roomId}`, {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  } catch (e) {
    console.error(e);
  }
};

export const checkChest = async (
  roomId: string,
  chestIndex: number,
  position: Player['position']
) => {
  const dto: CheckChestDto = {
    command:
      position === 'N'
        ? WAITING_FOR_STATE.NCheckChest
        : WAITING_FOR_STATE.SCheckChest,
    chestIndex,
  };
  try {
    await fetch(`${PARTYKIT_URL}/parties/room/${roomId}`, {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  } catch (e) {
    console.error(e);
  }
};
