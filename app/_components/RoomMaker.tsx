'use client';

import {useRef, useState} from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {createRoom} from '../_functions/create-room';

export default function RoomMaker() {
  const [title, setTitle] = useState('');

  return (
    <form action={createRoom}>
      <div className="space-y-4">
        <Input
          placeholder="your name"
          type="text"
          name="user-name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Button type="submit">Create Room</Button>
      </div>
    </form>
  );
}