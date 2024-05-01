'use server';

import {redirect} from 'next/navigation';
import {PARTYKIT_URL} from '../env';
import _ from 'lodash';

export async function createRoom(formData: FormData) {
  const id = _.random(100000, 999999).toString();

  redirect(`/room/${id}`);
}
