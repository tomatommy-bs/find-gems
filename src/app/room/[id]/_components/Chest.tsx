import {Player} from '@/src/functions/Player';
import {Gem as TGem} from '@/src/types/game';
import {number} from 'zod';
import Stone from './Stone';
import Gem from './Gem';

interface Props {
  topGems?: [TGem, TGem];
  bottomGems?: [TGem, TGem];
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
          className={`btn btn-square content-between border-yellow-800 py-1 ${props.selected ? 'bg-yellow-400' : 'bg-yellow-100'} border-2  hover:border-yellow-800 hover:bg-yellow-400 disabled:text-opacity-100`}
          disabled={props.disabledChest}
          onClick={props.onClick}
        >
          <span className="space-x-2">
            {props.topGems ? (
              <>
                <span>{<Gem visible={props.topGems[0] == 1} />}</span>
                <span>{<Gem visible={props.topGems[1] == 1} />}</span>
              </>
            ) : (
              <>
                <Gem type="unknown" />
                <Gem type="unknown" />
              </>
            )}
          </span>

          <span className="space-x-2">
            {!props.bottomGems ? (
              <>
                <Gem type="unknown" />
                <Gem type="unknown" />
              </>
            ) : (
              <>
                <span>{<Gem visible={props.bottomGems[0] == 1} />}</span>
                <span>{<Gem visible={props.bottomGems[1] == 1} />}</span>
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
