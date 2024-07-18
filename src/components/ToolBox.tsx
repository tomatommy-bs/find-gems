'use client';

import {
  useColorScheme,
  useFullscreen,
  useOrientation,
  useOs,
} from '@mantine/hooks';
import {use} from 'react';
import HowToModal, {
  HowToModalTrigger,
} from '../app/room/[id]/_components/HowToModal';
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconBrandX,
  IconQuestionMark,
} from '@tabler/icons-react';
import Link from 'next/link';

const ToolBox: React.FC = () => {
  const {toggle, fullscreen} = useFullscreen();
  const os = useOs();

  return (
    <div className="absolute right-0">
      <div className="flex flex-col items-center space-y-2 p-4">
        {/* iOS は全画面表示 API を提供してないらしい */}
        {os !== 'ios' && (
          <button className="btn btn-square btn-ghost btn-sm" onClick={toggle}>
            {fullscreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
          </button>
        )}
        <HowToModalTrigger>
          <IconQuestionMark />
        </HowToModalTrigger>
        <Link href={'https://twitter.com/TomaTommy123'} target="_blank">
          <IconBrandX />
        </Link>
        <HowToModal />
      </div>
    </div>
  );
};

export default ToolBox;
