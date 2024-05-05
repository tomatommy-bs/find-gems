'use client';

import {useRef, useState} from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {createRoom} from '../_functions/create-room';
import {useRouter} from 'next/navigation';

export default function RoomMaker() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = async (formData: FormData) => {
    const roomId = formData.get('join-room');
    router.push(`/room/${roomId}`);
  };

  const handleCreateRoom = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await createRoom(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form action={handleJoinRoom}>
        <div className="space-y-4">
          <Input
            name="join-room"
            type="number"
            placeholder="room ID to JOIN | e.g. 123456"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={roomId == ''}
          >
            Join Room
          </button>
        </div>
      </form>
      <div className="divider mx-auto w-1/2">or</div>
      <form action={handleCreateRoom}>
        <div className="space-y-4">
          <Input
            placeholder="your name"
            type="text"
            name="user-name"
            value={title}
            onChange={e => setTitle(e.target.value)}
            hidden
          />
          <button
            type="submit"
            className={`btn btn-primary btn-block ${isLoading && 'loading loading-dots'}`}
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
}
