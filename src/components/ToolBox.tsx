'use client';

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/16/solid';
import {useFullscreen} from '@mantine/hooks';
import {use} from 'react';
import HowToModal, {
  HowToModalTrigger,
} from '../app/room/[id]/_components/HowToModal';

const ToolBox: React.FC = () => {
  const {toggle, fullscreen} = useFullscreen();

  return (
    <div className="absolute right-0 flex flex-col space-y-2 p-4">
      <button className="btn btn-square btn-ghost btn-sm" onClick={toggle}>
        {fullscreen ? <ArrowsPointingInIcon /> : <ArrowsPointingOutIcon />}
      </button>
      <HowToModalTrigger>
        <button className="btn btn-circle btn-neutral btn-sm">
          <QuestionMarkCircleIcon />
        </button>
      </HowToModalTrigger>
      <HowToModal />
    </div>
  );
};

export default ToolBox;
