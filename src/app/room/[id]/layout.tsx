'use client';
import {
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/16/solid';
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
            <button className="btn btn-outline h-fit">
              <ArrowLeftStartOnRectangleIcon className="w-8" />
            </button>
          </Link>
          <p className="space-x-4">
            <div className="inline-flex flex-col justify-start">
              <button
                className="btn btn-outline btn-xs"
                onClick={() => navigator.clipboard.writeText(id)}
              >
                copy ID
              </button>
              <span className="text-xs">Room : {id}</span>
            </div>
            <button
              className="btn btn-outline btn-xs"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              copy URL
            </button>
          </p>
        </div>
        <Presence />
        <div className="grow overflow-scroll">{children}</div>
      </div>
    </Provider>
  );
}
