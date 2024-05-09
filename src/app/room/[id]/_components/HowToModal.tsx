import Chest from './Chest';

interface Props {
  children?: React.ReactNode;
}

const HowToModal: React.FC = () => {
  return (
    <dialog id="how-to-modal" className="modal">
      <div className="modal-scroll modal-box max-w-prose">
        <h2 className="text-xl font-bold">How to play</h2>
        <div className="divider" />
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
            for example ... if player{' '}
            <span className="badge badge-neutral">A</span> can see such as below
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
            and player <span className="badge badge-neutral">B</span> can see
            such as below
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

          <div className="divider" />
        </section>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
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
