import {HomeIcon} from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {id: string};
}) {
  const {id} = params;

  return (
    <div className="size-full">
      <div className="flex items-center space-x-4">
        <Link href={'/'}>
          <button className="btn btn-outline">
            <HomeIcon className="w-8" /> home
          </button>
        </Link>
        <p className="text-xl">Room : {id}</p>
      </div>
      {children}
    </div>
  );
}
