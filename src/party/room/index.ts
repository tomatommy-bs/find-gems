import type * as Party from 'partykit/server';
import {
  ChatMessage,
  connectionState as ConnectionState,
  CreateRoomResponse,
  createRoomResponse,
  ForceClientActMessage,
  ROOM_MESSAGE_TYPE,
  RoomMessage,
  RoomMessageDto,
  SyncGameMessage,
  SyncPresenceMessage,
  zodChatMessage,
  zodChatMessageDto,
  zodCheckChestDto,
  zodJoinRoomMessageDto,
  zodPutStoneDto,
  zodRoomApiDto,
  zodRoomMessageDto,
} from './type';
import {GameMaster} from '@/src/functions/GameMaster';
import {FORCE_CLIENT_ACT_MESSAGE, WAITING_FOR_STATE} from '@/src/types/game';
import {BroadcastManager} from './broadcastManager';

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  gameMaster: GameMaster | null = null;
  NConnection: Party.Connection | null = null;
  SConnection: Party.Connection | null = null;

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
        this.broadcastGameState();
        return Response.json({});
      }
      case WAITING_FOR_STATE.NCheckChest: {
        const data = zodCheckChestDto.parse(json);
        this.gameMaster?.checkChest('N', data.chestIndex);
        this.saveGameMaster();
        this.broadcastGameState();
        return Response.json({});
      }
      case WAITING_FOR_STATE.SCheckChest: {
        const data = zodCheckChestDto.parse(json);
        this.gameMaster?.checkChest('S', data.chestIndex);
        this.saveGameMaster();
        this.broadcastGameState();
        return Response.json({});
      }
      case WAITING_FOR_STATE.NPutStone: {
        const data = zodPutStoneDto.parse(json);
        this.gameMaster?.putStone('N', data.chestIndex);
        this.saveGameMaster();
        this.broadcastGameState();
        return Response.json({});
      }
      case WAITING_FOR_STATE.SPutStone: {
        const data = zodPutStoneDto.parse(json);
        this.gameMaster?.putStone('S', data.chestIndex);
        this.saveGameMaster();
        this.broadcastGameState();
        return Response.json({});
      }
      case WAITING_FOR_STATE.nextGame: {
        this.gameMaster?.nextGame();
        this.saveGameMaster();
        this.broadcastGameState();
        return Response.json({});
      }
      case WAITING_FOR_STATE.restartGame: {
        this.broadcastGameState();
        return Response.json({});
      }
      default:
        throw new Error(command satisfies never);
    }
  }

  async onConnect(
    connection: Party.Connection<ConnectionState>,
    ctx: Party.ConnectionContext
  ) {
    if (this.NConnection === null) {
      this.NConnection = connection;
      this.setConnectionState(connection, {position: 'N'});
    } else if (this.SConnection === null) {
      this.SConnection = connection;
      this.setConnectionState(connection, {position: 'S'});
    }

    this.broadcastGameState();
  }

  onClose(connection: Party.Connection<{name?: string}>): void | Promise<void> {
    BroadcastManager.broadcastLeaveMessage(this.party, connection);
    BroadcastManager.broadcastPresence(this.party);
  }

  onMessage(message: string, sender: Party.Connection): void | Promise<void> {
    const json = JSON.parse(message);
    const roomMessageDto = zodRoomMessageDto.parse(json);

    switch (roomMessageDto.type) {
      case ROOM_MESSAGE_TYPE.chat: {
        const chatMessage = zodChatMessageDto.parse(json);
        const data: ChatMessage = {
          type: 'chat',
          messageType: 'message',
          sender: sender.id,
          message: chatMessage.message,
        };
        this.party.broadcast(JSON.stringify(data));
        break;
      }
      case ROOM_MESSAGE_TYPE.join: {
        const joinMessage = zodJoinRoomMessageDto.parse(json);
        this.setConnectionState(sender, {name: joinMessage.name});
        const data: ChatMessage = {
          type: 'chat',
          messageType: 'presence',
          sender: 'system',
          message: `${joinMessage.name} joined`,
        };
        this.party.broadcast(JSON.stringify(data));
        BroadcastManager.broadcastPresence(this.party);
        break;
      }
    }
  }

  private setConnectionState(connection: Party.Connection, state: object) {
    connection.setState({...connection.state, ...state});
  }

  private async broadcastGameState() {
    this.broadcastGameStateForNPlayer();
    this.broadcastGameStateForSPlayer();
  }

  private async broadcastGameStateForNPlayer() {
    if (this.gameMaster === null) return;
    if (this.NConnection === null || this.SConnection === null) return;
    const data: SyncGameMessage = {
      type: ROOM_MESSAGE_TYPE.syncGame,
      sender: 'system',
      message: 'game started',
      gameState: {
        chestInfo: this.gameMaster.getChestInfoByPlayer('N'),
        waitingFor: this.gameMaster.whatShouldDoNext(),
        position: 'N',
        score: this.gameMaster.score,
      },
    };
    this.party.broadcast(JSON.stringify(data), [this.SConnection.id]);
  }

  private async broadcastGameStateForSPlayer() {
    if (this.gameMaster === null) return;
    if (this.NConnection === null || this.SConnection === null) return;
    const data: SyncGameMessage = {
      type: ROOM_MESSAGE_TYPE.syncGame,
      sender: 'system',
      message: 'game started',
      gameState: {
        chestInfo: this.gameMaster.getChestInfoByPlayer('S'),
        waitingFor: this.gameMaster.whatShouldDoNext(),
        position: 'S',
        score: this.gameMaster.score,
      },
    };
    this.party.broadcast(JSON.stringify(data), [this.NConnection.id]);
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
