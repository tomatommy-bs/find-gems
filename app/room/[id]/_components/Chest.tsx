import {Player} from '@/functions/Player';
import {Gem} from '@/types/game';

interface Props {
  gems: [Gem, Gem];
  checkedBy?: Player['position'];
  stones?: Player['position'][];
  selected?: boolean;
  number?: number;
  onClick?: () => void;
}

const Chest: React.FC<Props> = props => {
  return (
    <button
      className={`btn btn-square ${props.selected ? 'btn-primary' : ''}`}
      onClick={props.onClick}
    >
      <span className="space-x-2">
        <span>{props.gems[0]}</span>
        <span>{props.gems[1]}</span>
      </span>
    </button>
  );
};

export default Chest;
