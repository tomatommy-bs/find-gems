import Button from '@/components/Button';
import RoomMaker from '@/app/_components/RoomMaker';
import {redirect} from 'next/navigation';
import {PARTYKIT_URL} from '../env';
import Input from '@/components/Input';
import {createRoom} from '../_functions/create-room';

export default function Home() {
  return (
    <>
      <RoomMaker />
    </>
  );
}
