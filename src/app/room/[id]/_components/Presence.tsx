import {useAtomValue} from 'jotai';
import {presenceAtom} from '../contexts';
import {UserCircleIcon} from '@heroicons/react/16/solid';
import PlayerBadge from '@/src/components/Player';

const Presence: React.FC = () => {
  const presence = useAtomValue(presenceAtom);
  return (
    <div className="flex space-x-4">
      {presence.map(user => (
        <PlayerBadge key={user.id} position={user.position} name={user.name} />
      ))}
    </div>
  );
};

export default Presence;
