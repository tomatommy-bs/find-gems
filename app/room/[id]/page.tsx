'use client';

import {PARTYKIT_URL} from '@/app/env';
import useWebSocket from 'partysocket/use-ws';

export default function RoomPage({params}: {params: {id: string}}) {
  const {} = useWebSocket(`${PARTYKIT_URL}/party/${params.id}`);
  return (
    <>
      <div className="flex flex-col space-y-4">
        <p>Room : {params.id}</p>
      </div>
    </>
  );
}
