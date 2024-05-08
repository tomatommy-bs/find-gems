import {useAtomValue} from 'jotai';
import {presenceAtom} from '../contexts';
import {UserCircleIcon} from '@heroicons/react/16/solid';

const Presence: React.FC = () => {
  const presence = useAtomValue(presenceAtom);
  return (
    <div className="flex space-x-4">
      {presence.map(user => (
        <div key={user.id} className="flex items-center space-x-2">
          <div className="badge pl-0">
            <div className="avatar">
              <div className="mask mask-circle w-8 bg-white text-orange-300">
                <UserCircleIcon />
              </div>
            </div>
            <span>{user.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Presence;
