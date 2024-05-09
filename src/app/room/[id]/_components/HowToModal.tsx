import {useCounter} from '@mantine/hooks';
import Chest from './Chest';
import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';
import {Player} from '@/src/functions/Player';
import PlayerBadge from '@/src/components/Player';

interface Props {
  children?: React.ReactNode;
}

const HowToModal: React.FC = () => {
  return (
    <dialog id="how-to-modal" className="modal">
      <div className="modal-scroll modal-box min-h-[50vh]">
        <h2 className="text-xl font-bold">How to play</h2>
        <div role="tablist" className="tabs tabs-lifted">
          <input
            name="tab"
            type="radio"
            role="tab"
            className="tab"
            aria-label="page1"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6"
          >
            <Page1 />
          </div>

          <input
            name="tab"
            type="radio"
            role="tab"
            className="tab"
            aria-label="page2"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6"
          >
            <Page2 />
          </div>
          <input
            name="tab"
            type="radio"
            role="tab"
            className="tab"
            aria-label="page3"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6"
          >
            <Page3 />
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const Page1: React.FC = () => {
  return (
    <section className="space-y-2">
      <p>this is a game where you have to guess the gems in the chest.</p>
      <p>there are 6 types of chest.</p>
      <div className="flex justify-evenly">
        <Chest bottomGems={[0, 0]} topGems={[0, 0]} showStones={false} />
        <Chest bottomGems={[0, 0]} topGems={[0, 1]} showStones={false} />
        <Chest bottomGems={[0, 0]} topGems={[1, 1]} showStones={false} />
        <Chest bottomGems={[1, 0]} topGems={[0, 1]} showStones={false} />
        <Chest bottomGems={[0, 1]} topGems={[1, 1]} showStones={false} />
        <Chest bottomGems={[1, 1]} topGems={[1, 1]} showStones={false} />
      </div>
      <p>but each player can see each side of gems</p>
      <p>
        for example ... if player <span className="badge badge-neutral">A</span>{' '}
        can see such as below
      </p>
      <div className="flex justify-evenly">
        <Chest bottomGems={[0, 0]} showStones={false} />
        <Chest bottomGems={[0, 0]} showStones={false} />
        <Chest bottomGems={[0, 0]} showStones={false} />
        <Chest bottomGems={[1, 0]} showStones={false} />
        <Chest bottomGems={[0, 1]} showStones={false} />
        <Chest bottomGems={[1, 1]} showStones={false} />
      </div>
      <p>
        and player <span className="badge badge-neutral">B</span> can see such
        as below
      </p>
      <div className="flex justify-evenly">
        <Chest topGems={[0, 0]} showStones={false} />
        <Chest topGems={[0, 1]} showStones={false} />
        <Chest topGems={[1, 1]} showStones={false} />
        <Chest topGems={[0, 0]} showStones={false} />
        <Chest topGems={[0, 0]} showStones={false} />
        <Chest topGems={[1, 0]} showStones={false} />
      </div>
      <p>the chests are set by randomly ordered and randomly rotated.</p>
    </section>
  );
};

const Page2: React.FC = () => {
  return (
    <section className="space-y-2">
      <p>At first, you can check the chest by clicking it.</p>
      <p>then, you will can get the number of gems the chest has.</p>
      <p>the number will help you guess how many gems the chest has</p>
      <div className="my-4 flex items-center space-x-2">
        <Chest topGems={[1, 0]} showStones={false} />
        <span className="text-4xl">=</span>
        <Chest topGems={[1, 0]} bottomGems={[0, 0]} showStones={false} />
        <span className="font-bold">or</span>
        <Chest topGems={[1, 0]} bottomGems={[0, 1]} showStones={false} />
        <span className="font-bold">or</span>
        <Chest topGems={[1, 0]} bottomGems={[1, 0]} showStones={false} />
        <span className="font-bold">or</span>
        <Chest topGems={[1, 0]} bottomGems={[1, 1]} showStones={false} />
      </div>
      <div className="my-4 flex items-center space-x-2">
        <Chest topGems={[1, 0]} showStones={false} />
        <span className="relative w-12 text-center">
          <ArrowRightIcon className="mx-auto h-8" />
          <span className="absolute inset-x-0 bottom-0 translate-y-1/2 text-xs">
            check!
          </span>
        </span>
        <Chest topGems={[1, 0]} number={2} showStones={false} />
        <span className="text-4xl">=</span>
        <Chest
          topGems={[1, 0]}
          bottomGems={[0, 1]}
          number={2}
          showStones={false}
        />
        <span className="font-bold">or</span>
        <Chest
          topGems={[1, 0]}
          bottomGems={[1, 0]}
          number={2}
          showStones={false}
        />
      </div>
      <p>
        Second, enemy also check the one of the chest exclude you have already
        chosen one.
      </p>
      <p>
        Finally, you will see the chest such as below. This is one of the
        examples.
      </p>
      <div className="my-4 flex items-center justify-evenly">
        <Chest topGems={[1, 0]} number={2} showStones={false} />
        <Chest topGems={[0, 1]} checkedBy="S" showStones={false} />
        <Chest topGems={[1, 0]} showStones={false} />
        <Chest topGems={[1, 1]} showStones={false} />
        <Chest topGems={[0, 0]} showStones={false} />
        <Chest topGems={[1, 0]} showStones={false} />
      </div>
    </section>
  );
};

export const Page3: React.FC = () => {
  return (
    <section className="space-y-2">
      <p>Next, you guys should put stones on the chest.</p>
      <ol className="ml-8 list-decimal">
        <li>The chest with your stone on top belongs to you.</li>
        <li>You can stack up to two stones on the chest.</li>
        <li>A player must get two chests.</li>
        <li>The players must take turns placing stones.</li>
        <li>
          If one player has already placed two stones on the chest, the another
          player can continue to place stones.
        </li>
      </ol>
      <p>For example ...</p>
      <div className="flex justify-evenly">
        <div className="flex items-center justify-center space-x-2">
          <Chest topGems={[1, 0]} stones={['N']} />
          <ArrowRightIcon className="mx-auto h-8" />
          <PlayerBadge name="John" position="N" />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Chest topGems={[1, 0]} stones={['N', 'S']} />
          <ArrowRightIcon className="mx-auto h-8" />
          <PlayerBadge name="Bob" position="S" />
        </div>
      </div>
    </section>
  );
};

export const HowToModalTrigger: React.FC<Props> = props => {
  return (
    <button
      className="btn btn-circle btn-neutral btn-sm"
      onClick={() => {
        const modal = document.getElementById(
          'how-to-modal'
        ) as HTMLDialogElement;
        modal.showModal();
      }}
    >
      {props.children}
    </button>
  );
};

export default HowToModal;
