import type * as Party from 'partykit/server';
import {
  connectionState,
  ROOM_MESSAGE_TYPE,
  SyncPresenceMessage,
  zodRoomApiDto,
} from './type';
import {WAITING_FOR_STATE} from '@/src/types/game';

export class BroadcastManager {
  static async broadcastPresence(party: Party.Party) {
    const users = Array.from(
      party.getConnections<{name?: string; position?: 'N' | 'S'}>()
    ).map(c => {
      return {id: c.id, name: c.state?.name, position: c.state?.position};
    });
    const data: SyncPresenceMessage = {
      type: ROOM_MESSAGE_TYPE.syncPresence,
      sender: 'system',
      message: 'presence updated',
      users: users,
    };
    party.broadcast(JSON.stringify(data));
  }

  static async broadcastLeaveMessage(
    party: Party.Party,
    connection: Party.Connection<connectionState>
  ) {
    const name = connection.state?.name;

    const data: SyncPresenceMessage = {
      type: ROOM_MESSAGE_TYPE.syncPresence,
      sender: 'system',
      message: `${name} disconnected`,
      users: [],
    };
    party.broadcast(JSON.stringify(data));
  }
}
