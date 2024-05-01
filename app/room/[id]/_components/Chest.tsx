import {Player} from '@/functions/Player';
import {Gem} from '@/types/game';
import {number} from 'zod';

interface Props {
  gems: [Gem, Gem];
  checkedBy?: Player['position'];
  stones?: Player['position'][];
  selected?: boolean;
  number?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const Chest: React.FC<Props> = props => {
  return (
    <div className="indicator flex flex-col items-center">
      {props.number && (
        <span className="badge indicator-item badge-primary">
          {props.number}
        </span>
      )}
      {props.checkedBy && props.number == undefined && (
        <span className="badge indicator-item badge-secondary">?</span>
      )}
      <button
        className={`btn btn-square ${props.selected ? 'btn-primary' : ''} ${props.disabled ? 'btn-disabled' : ''}`}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        <span className="space-x-2">
          <span>{props.gems[0]}</span>
          <span>{props.gems[1]}</span>
        </span>
      </button>
    </div>
  );
};

export default Chest;
