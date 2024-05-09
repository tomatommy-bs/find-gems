'use client';

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/16/solid';
import {useFullscreen} from '@mantine/hooks';
import {use} from 'react';

const ToolBox: React.FC = () => {
  const {toggle, fullscreen} = useFullscreen();

  return (
    <div className="absolute right-0 p-4">
      <button
        className="btn btn-square btn-ghost btn-sm m-0 overflow-hidden  p-0"
        onClick={toggle}
      >
        {fullscreen ? <ArrowsPointingInIcon /> : <ArrowsPointingOutIcon />}
      </button>
    </div>
  );
};

export default ToolBox;
