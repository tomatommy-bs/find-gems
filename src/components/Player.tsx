import {UserCircleIcon} from '@heroicons/react/16/solid';

interface Props {
  position?: string;
  name?: string;
}

const PlayerBadge: React.FC<Props> = props => {
  const {position, name} = props;

  return (
    <div className="flex items-center space-x-2">
      <div className="indicator">
        {position != undefined && (
          <span className="badge indicator-item badge-sm">{position}</span>
        )}
        <div className="badge badge-neutral pl-0">
          <div className="avatar">
            <div className="mask mask-circle w-8 bg-neutral text-orange-300">
              <UserCircleIcon />
            </div>
          </div>
          <span>{name}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerBadge;
