interface Props {
  children?: React.ReactNode;
}

const Card: React.FC<Props> = props => {
  return (
    <div className="relative bg-white w-full h-full md:h-auto p-8 md:rounded-xl md:shadow-xl">
      {props.children}
    </div>
  );
};

export default Card;
