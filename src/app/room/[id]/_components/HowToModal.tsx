import {IconArrowRight, IconPlus} from '@tabler/icons-react';
import Chest from './Chest';
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
          {[
            <Page1 key={1} />,
            <Page2 key={2} />,
            <Page3 key={3} />,
            <Page4 key={4} />,
          ].map((page, i) => (
            <>
              <input
                name="tab"
                type="radio"
                role="tab"
                className="tab"
                aria-label={`page${i + 1}`}
                defaultChecked={i == 0}
              />
              <div
                role="tabpanel"
                className="tab-content rounded-box border-base-300 bg-base-100 p-6"
              >
                {page}
              </div>
            </>
          ))}
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
      <p>This is a game where you have to guess the gems in the chest.</p>
      <p>There are 6 types of chests.</p>
      <div className="flex justify-evenly">
        <Chest bottomGems={[0, 0]} topGems={[0, 0]} showStones={false} />
        <Chest bottomGems={[0, 0]} topGems={[0, 1]} showStones={false} />
        <Chest bottomGems={[0, 0]} topGems={[1, 1]} showStones={false} />
        <Chest bottomGems={[1, 0]} topGems={[0, 1]} showStones={false} />
        <Chest bottomGems={[0, 1]} topGems={[1, 1]} showStones={false} />
        <Chest bottomGems={[1, 1]} topGems={[1, 1]} showStones={false} />
      </div>
      <p>But each player can see one side of chests.</p>
      <p>
        For example, if player <span className="badge badge-neutral">A</span>{' '}
        can see the following:
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
        And player <span className="badge badge-neutral">B</span> can see the
        following:
      </p>
      <div className="flex justify-evenly">
        <Chest topGems={[0, 0]} showStones={false} />
        <Chest topGems={[0, 1]} showStones={false} />
        <Chest topGems={[1, 1]} showStones={false} />
        <Chest topGems={[0, 0]} showStones={false} />
        <Chest topGems={[0, 0]} showStones={false} />
        <Chest topGems={[1, 0]} showStones={false} />
      </div>
      <p>The chests are randomly ordered and randomly rotated.</p>
    </section>
  );
};

const Page2: React.FC = () => {
  return (
    <section className="space-y-2">
      <p>Initially, you can check the chest by clicking it.</p>
      <p>Then, you will receive the number of gems the chest has.</p>
      <p>This number will help you guess how many gems the chest has.</p>
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
          <IconArrowRight className="mx-auto h-8" />
          <span className="absolute inset-x-0 bottom-0 translate-y-1/2 text-xs">
            Check!
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
        Secondly, the opponent also checks one of the chests, excluding the one
        you have already chosen.
      </p>
      <p>
        Finally, you will see the chest as follows, which is one of the
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

const Page3: React.FC = () => {
  return (
    <section className="space-y-2">
      <p>Next, both players should place stones on the chests.</p>
      <ol className="ml-8 list-decimal">
        <li>The chest with your stone on top belongs to you.</li>
        <li>You can stack up to two stones on the chest.</li>
        <li>A player must obtain two chests.</li>
        <li>The players must take turns placing stones.</li>
        <li>
          If one player has already placed two stones on the chest, the other
          player can continue to place stones.
        </li>
      </ol>
      <p>For example:</p>
      <div className="flex justify-evenly">
        <div className="flex items-center justify-center space-x-2">
          <Chest topGems={[1, 0]} stones={['N']} />
          <IconArrowRight className="mx-auto h-8" />
          <PlayerBadge name="John" position="N" />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Chest topGems={[1, 0]} stones={['N', 'S']} />
          <IconArrowRight className="mx-auto h-8" />
          <PlayerBadge name="Bob" position="S" />
        </div>
      </div>
    </section>
  );
};

const Page4: React.FC = () => {
  return (
    <section className="space-y-2">
      <p>Finally, the player with the greater number of gems will win 🎉</p>
      <div className="flex items-center justify-center space-x-2">
        <div className="space-y-4">
          <PlayerBadge name="John" position="N" />
          <div className="flex items-center space-x-2">
            <Chest topGems={[1, 0]} bottomGems={[0, 1]} showStones={false} />
            <IconPlus className="h-8" />
            <Chest topGems={[1, 0]} bottomGems={[1, 1]} showStones={false} />
          </div>
        </div>
        <span className="mt-8 text-4xl">{'<'}</span>
        <div className="relative rounded-md bg-green-200 p-2">
          <span className="absolute right-0 top-0 m-1">🎉</span>
          <PlayerBadge name="Bob" position="S" />
          <div className="mt-4 flex items-center space-x-2">
            <Chest topGems={[1, 1]} bottomGems={[1, 1]} showStones={false} />
            <IconPlus className="h-8" />
            <Chest topGems={[1, 0]} bottomGems={[1, 0]} showStones={false} />
          </div>
        </div>
      </div>
      <p>
        But note, the player who obtains{' '}
        <strong>both of the chests with two gems</strong> will win in the end.
      </p>
      <div className="flex items-center justify-center space-x-2">
        <div className="relative rounded-md bg-green-200 p-2">
          <span className="absolute right-0 top-0 m-1">🎉</span>
          <PlayerBadge name="John" position="N" />
          <div className="mt-4 flex items-center space-x-2">
            <Chest topGems={[1, 0]} bottomGems={[0, 1]} showStones={false} />
            <IconPlus className="h-8" />
            <Chest topGems={[1, 0]} bottomGems={[1, 0]} showStones={false} />
          </div>
        </div>
        <span className="mt-8 text-4xl">{'<'}</span>
        <div className="rounded-md">
          <PlayerBadge name="Bob" position="S" />
          <div className="mt-4 flex items-center space-x-2">
            <Chest topGems={[1, 1]} bottomGems={[1, 1]} showStones={false} />
            <IconPlus className="h-8" />
            <Chest topGems={[1, 0]} bottomGems={[1, 0]} showStones={false} />
          </div>
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
