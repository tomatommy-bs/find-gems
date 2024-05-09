'use client';
import {HomeIcon, QuestionMarkCircleIcon} from '@heroicons/react/16/solid';
import {Provider} from 'jotai';
import Link from 'next/link';
import Party from './_components/Party';
import HowToModal, {HowToModalTrigger} from './_components/HowToModal';
import Presence from './_components/Presence';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {id: string};
}) {
  const {id} = params;

  return (
    <Provider>
      <Party id={id} />
      <div className="flex h-full flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Link href={'/'}>
            <button className="btn btn-outline">
              <HomeIcon className="w-8" /> home
            </button>
          </Link>
          <p className="space-x-4">
            <span className="text-xl">Room : {id}</span>
            <button
              className="btn btn-outline btn-sm"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              copy URL
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigator.clipboard.writeText(id)}
            >
              copy ID
            </button>
          </p>
          <HowToModalTrigger>
            <button className="btn btn-circle btn-sm">
              <QuestionMarkCircleIcon />
            </button>
          </HowToModalTrigger>
        </div>
        <Presence />
        <div className="grow overflow-scroll">{children}</div>
      </div>
      <HowToModal />
    </Provider>
  );
}
