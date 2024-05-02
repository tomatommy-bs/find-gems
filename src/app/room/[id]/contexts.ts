import {ChatMessage, SyncGameMessage} from '@/src/party/room/type';
import {atom} from 'jotai';
import PartySocket from 'partysocket';

export const chatAtom = atom<ChatMessage[]>([]);
export const gameStateAtom = atom<SyncGameMessage['gameState'] | null>(null);
export const partySocketAtom = atom<PartySocket | null>(null);
