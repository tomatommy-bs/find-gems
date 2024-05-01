import type * as Party from 'partykit/server';
import {
  ChatMessage,
  CreateRoomResponse,
  createRoomResponse,
  ForceClientActMessage,
  ROOM_MESSAGE_TYPE,
  SyncGameMessage,
  zodCheckChestDto,
  zodPutStoneDto,
  zodRoomApiDto,
} from './type';
import {GameMaster} from '@/functions/GameMaster';
import {FORCE_CLIENT_ACT_MESSAGE, WAITING_FOR_STATE} from '@/types/game';

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  gameMaster: GameMaster = new GameMaster();

  private saveGameMaster() {
    this.party.storage.put('gameMaster', this.gameMaster);
  }

  async onRequest(req: Party.Request) {
    const json = await req.json();
    const {command} = zodRoomApiDto.parse(json);

    switch (command) {
      case WAITING_FOR_STATE.startGame: {
        const gm = new GameMaster();
        this.gameMaster = gm;
        this.saveGameMaster();
        const resDataForceClientAct: ForceClientActMessage = {
          type: ROOM_MESSAGE_TYPE.forceClient,
          sender: 'system',
          message: FORCE_CLIENT_ACT_MESSAGE.jumpToGamePage,
        };
        this.party.broadcast(JSON.stringify(resDataForceClientAct));
        this.broadcastGameStateForNPlayer();
        return Response.json({});
      }
      case WAITING_FOR_STATE.NCheckChest: {
        const data = zodCheckChestDto.parse(json);
        this.gameMaster.checkChest('N', data.chestIndex);
        this.saveGameMaster();
        return Response.json({});
      }
      case WAITING_FOR_STATE.SCheckChest: {
        const data = zodCheckChestDto.parse(json);
        this.gameMaster.checkChest('S', data.chestIndex);
        this.saveGameMaster();
        return Response.json({});
      }
      case WAITING_FOR_STATE.NPutStone: {
        const data = zodPutStoneDto.parse(json);
        this.gameMaster.putStone('N', data.chestIndex);
        this.saveGameMaster();
        return Response.json({});
      }
      case WAITING_FOR_STATE.SPutStone: {
        const data = zodPutStoneDto.parse(json);
        this.gameMaster.putStone('S', data.chestIndex);
        this.saveGameMaster();
        return Response.json({});
      }
      case WAITING_FOR_STATE.restartGame: {
        return Response.json({});
      }
      default:
        throw new Error(command satisfies never);
    }
  }

  async onConnect(connection: Party.Connection, ctx: Party.ConnectionContext) {
    const id = connection.id;

    this.broadcastGameStateForNPlayer();
    const data: ChatMessage = {
      type: ROOM_MESSAGE_TYPE.chat,
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

  private async broadcastGameStateForNPlayer() {
    const data: SyncGameMessage = {
      type: ROOM_MESSAGE_TYPE.syncGame,
      sender: 'system',
      message: 'game started',
      gameState: {
        chestInfo: this.gameMaster.getChestInfoByPlayer('N'),
        waitingFor: this.gameMaster.whatShouldDoNext(),
      },
    };
    this.party.broadcast(JSON.stringify(data));
  }

  async onStart() {
    const gm = await this.party.storage.get<GameMaster>('gameMaster');
    if (gm) this.gameMaster = gm;
    else {
      this.gameMaster = new GameMaster();
      this.saveGameMaster();
    }
  }
}

Server satisfies Party.Worker;
