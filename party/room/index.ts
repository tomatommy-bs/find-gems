import type * as Party from 'partykit/server';
import {
  ChatMessage,
  CreateRoomDto,
  CreateRoomResponse,
  createRoomResponse,
  SyncGameMessage,
  zodCheckChestDto,
  zodCreateRoomDto,
  zodPutStoneDto,
  zodRoomApiDto,
} from './type';
import {GameMaster} from '@/functions/GameMaster';
import {WAITING_FOR_STATE} from '@/types/game';

export default class Server implements Party.Server {
  private gameMaster: GameMaster = new GameMaster();
  constructor(readonly party: Party.Party) {}

  async onRequest(req: Party.Request) {
    const json = await req.json();
    const {command} = zodRoomApiDto.parse(json);

    switch (command) {
      case 'create-room': {
        const data = zodCreateRoomDto.parse(json);
        const id = this.createRoom(data);
        const resData: CreateRoomResponse = {
          id,
          nextToDo: WAITING_FOR_STATE.startGame,
        };
        return Response.json(resData);
      }
      case WAITING_FOR_STATE.startGame: {
        this.gameMaster.startGame();
        const resDataForNPlayer: SyncGameMessage = {
          type: 'sync-game',
          sender: 'system',
          message: 'game started',
          gameState: {
            chestInfo: this.gameMaster.getChestInfoByPlayer('N'),
            waitingFor: this.gameMaster.whatShouldDoNext(),
          },
        };
        this.party.broadcast(JSON.stringify(resDataForNPlayer));

        return new Response();
      }
      case WAITING_FOR_STATE.NCheckChest: {
        const data = zodCheckChestDto.parse(json);
        this.gameMaster.checkChest('N', data.chestIndex);
        return new Response();
      }
      case WAITING_FOR_STATE.SCheckChest: {
        const data = zodCheckChestDto.parse(json);
        this.gameMaster.checkChest('S', data.chestIndex);
        return new Response();
      }
      case WAITING_FOR_STATE.NPutStone: {
        const data = zodPutStoneDto.parse(json);
        this.gameMaster.putStone('N', data.chestIndex);
        return new Response();
      }
      case WAITING_FOR_STATE.SPutStone: {
        const data = zodPutStoneDto.parse(json);
        this.gameMaster.putStone('S', data.chestIndex);
        return new Response();
      }
      case WAITING_FOR_STATE.restartGame: {
        return new Response();
      }
      default:
        throw new Error(command satisfies never);
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

  private randomId = () => Math.random().toString(36).substring(2, 10);
}

Server satisfies Party.Worker;
