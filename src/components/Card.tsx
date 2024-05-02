interface Props {
  children?: React.ReactNode;
}

const Card: React.FC<Props> = props => {
  return (
    <div className="relative size-full h-auto rounded-xl bg-white p-8 shadow-xl">
      {props.children}
    </div>
  );
};

export default Card;
