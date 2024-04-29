import Button from '@/components/Button';
import RoomMaker from '@/app/(components)/RoomMaker';
import {redirect} from 'next/navigation';
import {PARTYKIT_URL} from './env';
import Input from '@/components/Input';
import {createPoll} from './(functions)/create-room';

export default function Home() {
  return (
    <>
      <RoomMaker />
    </>
  );
}
