'use client';

import Button from '@/src/components/Button';
import RoomMaker from '@/src/app/_components/RoomMaker';
import {redirect} from 'next/navigation';
import {PARTYKIT_HOST, PARTYKIT_URL} from '../env';
import Input from '@/src/components/Input';
import {createRoom} from '../_functions/create-room';
import usePartySocket from 'partysocket/react';
import Card from '@/src/components/Card';
import {useLocalStorage} from '@/src/hooks/use-local-storage/use-local-storage';
import {useEffect} from 'react';
import {set} from 'lodash';
import {PencilIcon, PencilSquareIcon} from '@heroicons/react/16/solid';

const modalName = 'name-modal';

export default function Home() {
  const [name, setName] = useLocalStorage({key: 'name', defaultValue: ''});

  const openModal = () => {
    const dialog = document.getElementById(modalName) as HTMLDialogElement;
    dialog.showModal();
  };

  const closeModal = () => {
    const dialog = document.getElementById(modalName) as HTMLDialogElement;
    dialog.close();
  };

  useEffect(() => {
    if (name !== '') closeModal();
    else openModal();
  }, [name, setName]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector(
      'input'
    ) as HTMLInputElement;
    setName(input.value);
    closeModal();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2">
      {name !== '' && (
        <div role="alert" className="alert">
          <button className="btn btn-square btn-xs" onClick={openModal}>
            <PencilSquareIcon />
          </button>
          <p>hello, {name}! 👋</p>
        </div>
      )}
      <Card>
        <RoomMaker />
      </Card>
      <dialog id={modalName} className="modal">
        <form className="modal-box" onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <input
              className="input input-primary grow"
              placeholder="Please input your NAME"
              required
              defaultValue={name}
            />
            <button className="btn inline-block" type="submit">
              ok
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
