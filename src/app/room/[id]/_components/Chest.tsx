import {Player} from '@/src/functions/Player';
import {Gem} from '@/src/types/game';
import {number} from 'zod';
import Stone from './Stone';

interface Props {
  topGems?: [Gem, Gem];
  bottomGems?: [Gem, Gem];
  checkedBy?: Player['position'];
  stones?: Player['position'][];
  selected?: boolean;
  number?: number | null;
  disabledChest?: boolean;
  disabledStoneTop?: boolean;
  disabledStoneBottom?: boolean;
  showStones?: boolean;
  onClick?: () => void;
}

const Chest: React.FC<Props> = ({showStones = true, ...props}) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      {showStones && (
        <>
          <Stone
            selected={props.selected}
            onClick={props.onClick}
            disabled={props.disabledStoneTop}
            putBy={props.stones?.[1]}
          />
          <Stone
            selected={props.selected}
            onClick={props.onClick}
            disabled={props.disabledStoneBottom}
            putBy={props.stones?.[0]}
          />
        </>
      )}
      <div className="indicator">
        {props.number != undefined && (
          <span className="badge indicator-item badge-primary">
            {props.number}
          </span>
        )}
        {props.checkedBy && props.number == undefined && (
          <span className="badge indicator-item badge-secondary">?</span>
        )}
        <button
          className={`btn btn-square content-between py-1 ${props.selected ? 'btn-accent' : ''}`}
          disabled={props.disabledChest}
          onClick={props.onClick}
        >
          <span className="space-x-2">
            {props.topGems ? (
              <>
                <span>{props.topGems[0]}</span>
                <span>{props.topGems[1]}</span>
              </>
            ) : (
              <>
                <span>?</span>
                <span>?</span>
              </>
            )}
          </span>

          <span className="space-x-2">
            {!props.bottomGems ? (
              <>
                <span>?</span>
                <span>?</span>
              </>
            ) : (
              <>
                <span>{props.bottomGems[0]}</span>
                <span>{props.bottomGems[1]}</span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};
Chest.defaultProps = {
  showStones: true,
};

export default Chest;
