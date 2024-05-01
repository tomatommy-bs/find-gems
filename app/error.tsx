'use client'; // Error components must be Client Components

import Card from '@/components/Card';
import Link from 'next/link';
import {useEffect} from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card>
      <h2>Something went wrong!</h2>
      <Link href="/">
        <button className="btn btn-primary btn-block">Go back home</button>
      </Link>
    </Card>
  );
}
