'use client';

import {useRef, useState} from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {createRoom} from '../_functions/create-room';

export default function RoomMaker() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await createRoom(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={handleSubmit}>
      <div className="space-y-4">
        <Input
          placeholder="your name"
          type="text"
          name="user-name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className={`btn btn-primary btn-block ${isLoading && 'loading loading-dots'}`}
        >
          Create Room
        </button>
      </div>
    </form>
  );
}
