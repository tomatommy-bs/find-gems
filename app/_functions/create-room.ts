'use server';

import {redirect} from 'next/navigation';
import {PARTYKIT_URL} from '../env';
import {CreateRoomDto, zodCreateRoomDto} from '../(home)/types';

export async function createRoom(formData: FormData) {
  const data = parseData(formData);

  const res = await fetch(`${PARTYKIT_URL}/party/1`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const {id} = await res.json();

  redirect(`/room/${id}`);
}

function parseData(data: FormData): CreateRoomDto {
  const _data: Record<string, unknown> = {};

  _data.userName = data.get('user-name');

  return zodCreateRoomDto.parse(_data);
}
