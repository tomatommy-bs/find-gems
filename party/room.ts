import {CreateRoomDto, zodCreateRoomDto} from '@/app/(home)/types';
import type * as Party from 'partykit/server';

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  async onRequest(req: Party.Request) {
    const data = zodCreateRoomDto.parse(await req.json());
    const id = this.createRoom(data);
    return Response.json({id});
  }

  async onConnect(connection: Party.Connection, ctx: Party.ConnectionContext) {
    const id = connection.id;

    console.log('id', id);
    this.party.storage.put(id, connection);
  }

  private createRoom(data: CreateRoomDto) {
    const {userName} = data;
    const id = this.randomId();

    this.party.storage.put(id, id);
    return id;
  }

  private randomId = () => Math.random().toString(36).substring(2, 10);
}

Server satisfies Party.Worker;
