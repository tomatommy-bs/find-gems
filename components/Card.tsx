interface Props {
  children?: React.ReactNode;
}

const Card: React.FC<Props> = props => {
  return (
    <div className="relative size-full bg-white p-8 md:h-auto md:rounded-xl md:shadow-xl">
      {props.children}
    </div>
  );
};

export default Card;
