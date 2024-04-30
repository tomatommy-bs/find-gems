import type * as Party from 'partykit/server';
import {ChatMessage, CreateRoomDto, zodCreateRoomDto, zodRoomApi} from './type';

export default class Server implements Party.Server {
  gameState: 'waiting' | 'playing' | 'finished' = 'waiting';
  constructor(readonly party: Party.Party) {}

  async onRequest(req: Party.Request) {
    const json = await req.json();
    const {command} = zodRoomApi.parse(json);

    switch (command) {
      case 'create-room':
        const data = zodCreateRoomDto.parse(json);
        const id = this.createRoom(data);
        return Response.json({id});
      case 'start-game':
        this.startGame();
        return Response.json({message: 'Game started'});
    }
  }

  onConnect(connection: Party.Connection, ctx: Party.ConnectionContext) {
    const id = connection.id;

    const data: ChatMessage = {
      type: 'chat',
      messageType: 'presence',
      sender: 'system',
      message: `${id} connected`,
    };
    this.party.broadcast(JSON.stringify(data));
  }

  onClose(connection: Party.Connection): void | Promise<void> {
    const id = connection.id;

    const data: ChatMessage = {
      type: 'chat',
      messageType: 'presence',
      sender: 'system',
      message: `${id} disconnected`,
    };
    this.party.broadcast(JSON.stringify(data));
  }

  onMessage(
    message: string | ArrayBuffer | ArrayBufferView,
    sender: Party.Connection
  ): void | Promise<void> {
    const data: ChatMessage = {
      type: 'chat',
      messageType: 'message',
      sender: sender.id,
      message: message.toString(),
    };
    this.party.broadcast(JSON.stringify(data));
  }

  private createRoom(data: CreateRoomDto) {
    const {userName} = data;
    const id = this.randomId();

    this.party.storage.put(id, id);
    return id;
  }

  private startGame() {
    this.gameState = 'playing';
  }

  private randomId = () => Math.random().toString(36).substring(2, 10);
}

Server satisfies Party.Worker;
