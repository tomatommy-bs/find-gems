import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import {useState} from 'react';

const RoomJoiner = () => {
  const [title, setTitle] = useState('');

  return (
    <div className="space-y-4">
      <Input
        placeholder="your name"
        type="text"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button type="submit">Create Room</Button>
    </div>
  );
};

export default RoomJoiner;
