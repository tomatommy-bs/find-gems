'use server';

import {redirect} from 'next/navigation';
import {Poll} from './types';
import {PARTYKIT_URL} from './env';

const randomId = () => Math.random().toString(36).substring(2, 10);

export async function createPoll(formData: FormData) {
  const title = formData.get('title')?.toString() ?? 'Anonymous poll';
  const options: string[] = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith('option-') && value.toString().trim().length > 0) {
      options.push(value.toString());
    }
  }

  const id = randomId();
  const poll: Poll = {
    title,
    options,
  };

  await fetch(`${PARTYKIT_URL}/party/${id}`, {
    method: 'POST',
    body: JSON.stringify(poll),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  redirect(`/${id}`);
}
