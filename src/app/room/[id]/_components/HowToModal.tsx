interface Props {
  children?: React.ReactNode;
}

const HowToModal: React.FC = () => {
  return (
    <dialog id="how-to-modal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
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
