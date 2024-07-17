type GemProps = {
  type?: 'gem' | 'unknown';
  visible?: boolean;
};

const Gem: React.FC<GemProps> = props => {
  const {visible = true, type = 'gem'} = props;

  if (visible) {
    switch (type) {
      case 'gem':
        return <span className={`inline-block size-4`}>💎</span>;
      case 'unknown':
        return <span className={`inline-block size-4 text-slate-400`}>?</span>;
    }
  } else return <span className={`inline-block size-4 text-slate-400`}>●</span>;
};

export default Gem;
