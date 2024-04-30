import {CreateRoomDto, zodCreateRoomDto} from '@/app/(home)/types';
import type * as Party from 'partykit/server';

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  onConnect(
    connection: Party.Connection,
    ctx: Party.ConnectionContext
  ): void | Promise<void> {
    const connections = [];
    for (const connection of this.party.getConnections()) {
      connections.push(connection);
    }
    this.party.broadcast(`${connections.length}`);
  }
}

Server satisfies Party.Worker;
