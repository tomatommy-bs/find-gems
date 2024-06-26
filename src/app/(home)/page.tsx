'use client';

import RoomMaker from '@/src/app/_components/RoomMaker';
import Card from '@/src/components/Card';
import {useEffect} from 'react';
import Cookies from 'js-cookie';
import {useForceUpdate} from '@mantine/hooks';
import {IconPencil} from '@tabler/icons-react';

const modalName = 'name-modal';

export default function Home() {
  const forceUpdate = useForceUpdate();

  const name = Cookies.get('name') ?? '';

  const openModal = () => {
    const dialog = document.getElementById(modalName) as HTMLDialogElement;
    dialog.showModal();
  };

  const closeModal = () => {
    const dialog = document.getElementById(modalName) as HTMLDialogElement;
    dialog.close();
  };

  const setName = (name: string) => {
    Cookies.set('name', name, {expires: 365});
  };

  useEffect(() => {
    if (name !== '') closeModal();
    else openModal();
  }, [name]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector(
      'input'
    ) as HTMLInputElement;
    setName(input.value);
    forceUpdate();
    closeModal();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2">
      {name !== '' && (
        <div role="alert" className="alert">
          <button className="btn btn-square btn-xs" onClick={openModal}>
            <IconPencil />
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
