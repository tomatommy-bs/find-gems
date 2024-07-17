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
import Link from 'next/link';

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
      <Link href={'https://twitter.com/TomaTommy123'} target="_blank">
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
        </i>
      </Link>
      <HowToModal />
    </div>
  );
};

export default ToolBox;
