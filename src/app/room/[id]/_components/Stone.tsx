import {Player} from '@/src/functions/Player';

interface Props {
  selected?: boolean;
  putBy?: Player['position'];
  onClick?: () => void;
  disabled?: boolean;
}

const Stone: React.FC<Props> = props => {
  return (
    <div className="h-6 w-12">
      {props.putBy ? (
        <div
          className={`badge size-full rounded-lg ${props.putBy == 'N' ? 'badge-primary' : 'badge-secondary'}`}
        >
          {props.putBy}
        </div>
      ) : (
        <button
          className={`btn btn-xs size-full ${props.selected ? 'btn-accent' : ''} `}
          onClick={props.onClick}
          disabled={props.disabled}
        />
      )}
    </div>
  );
};

export default Stone;
