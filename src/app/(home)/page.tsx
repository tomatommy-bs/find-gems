'use client';

import Button from '@/src/components/Button';
import RoomMaker from '@/src/app/_components/RoomMaker';
import {redirect} from 'next/navigation';
import {PARTYKIT_HOST, PARTYKIT_URL} from '../env';
import Input from '@/src/components/Input';
import {createRoom} from '../_functions/create-room';
import usePartySocket from 'partysocket/react';
import Card from '@/src/components/Card';

export default function Home() {
  return (
    <div className="flex h-full items-center">
      <Card>
        <RoomMaker />
      </Card>
    </div>
  );
}
