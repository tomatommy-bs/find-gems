'use client';

import {useColorScheme, useFullscreen, useOrientation} from '@mantine/hooks';
import {use} from 'react';
import HowToModal, {
  HowToModalTrigger,
} from '../app/room/[id]/_components/HowToModal';
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconQuestionMark,
} from '@tabler/icons-react';

const ToolBox: React.FC = () => {
  const {toggle, fullscreen} = useFullscreen();

  return (
    <div className="absolute right-0 flex flex-col space-y-2 p-4">
      <button className="btn btn-square btn-ghost btn-sm" onClick={toggle}>
        {fullscreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
      </button>
      <HowToModalTrigger>
        <IconQuestionMark />
      </HowToModalTrigger>
      <HowToModal />
    </div>
  );
};

export default ToolBox;
