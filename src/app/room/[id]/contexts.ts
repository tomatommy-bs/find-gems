import {ChatMessage, SyncGameMessage} from '@/src/party/room/type';
import {atom} from 'jotai';
import PartySocket from 'partysocket';

export const chatAtom = atom<ChatMessage[]>([]);
chatAtom.debugLabel = 'chatAtom';
export const gameStateAtom = atom<SyncGameMessage['gameState'] | null>(null);
gameStateAtom.debugLabel = 'gameStateAtom';
export const partySocketAtom = atom<PartySocket | null>(null);
partySocketAtom.debugLabel = 'partySocketAtom';
export const presenceAtom = atom<
  {id: string; name?: string; position?: 'N' | 'S'}[]
>([]);
presenceAtom.debugLabel = 'presenceAtom';
