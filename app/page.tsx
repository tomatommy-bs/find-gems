import Button from '@/components/Button';
import PollMaker from '@/components/PollMaker';
import Balloon from '@/components/Balloon';
import {Poll} from '@/app/types';
import {redirect} from 'next/navigation';
import {PARTYKIT_URL} from './env';
import Input from '@/components/Input';
import {createPoll} from './function';

export default function Home() {
  return (
    <>
      <form action={createPoll}>
        <div className="flex flex-col space-y-6">
          <PollMaker />
        </div>
      </form>
      <Balloon />
    </>
  );
}
