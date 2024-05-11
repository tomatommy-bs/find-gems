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
import {PLAYER_POSITION} from '@/src/functions/Player';

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  gameMaster: GameMaster = new GameMaster();
  NConnection: Party.Connection<ConnectionState> | null = null;
  SConnection: Party.Connection<ConnectionState> | null = null;

  private saveGameMaster() {
    this.party.storage.put('gameMaster', this.gameMaster);
  }

  async onRequest(req: Party.Request) {
    const json = await req.json();
    const {command} = zodRoomApiDto.parse(json);

    switch (command) {
      case WAITING_FOR_STATE.startGame: {
        if (this.NConnection === null || this.SConnection === null)
          throw new Error('Not enough players');
        this.gameMaster.startGame({
          players: [
            {name: this.NConnection?.state?.name, id: this.NConnection?.id},
            {name: this.SConnection?.state?.name, id: this.SConnection?.id},
          ],
        });
        BroadcastManager.broadcastForceClientAct(
          this.party,
          FORCE_CLIENT_ACT_MESSAGE.jumpToGamePage
        );
        break;
      }
      case WAITING_FOR_STATE.NCheckChest: {
        const data = zodCheckChestDto.parse(json);
        this.gameMaster?.checkChest(PLAYER_POSITION.N, data.chestIndex);
        break;
      }
      case WAITING_FOR_STATE.SCheckChest: {
        const data = zodCheckChestDto.parse(json);
        this.gameMaster?.checkChest('S', data.chestIndex);
        break;
      }
      case WAITING_FOR_STATE.NPutStone: {
        const data = zodPutStoneDto.parse(json);
        this.gameMaster?.putStone('N', data.chestIndex);
        break;
      }
      case WAITING_FOR_STATE.SPutStone: {
        const data = zodPutStoneDto.parse(json);
        this.gameMaster?.putStone('S', data.chestIndex);
        break;
      }
      case WAITING_FOR_STATE.nextGame: {
        this.gameMaster?.nextGame();
        break;
      }
      case WAITING_FOR_STATE.restartGame: {
        break;
      }
      default:
        throw new Error(command satisfies never);
    }
    this.saveGameMaster();
    BroadcastManager.broadcastGameState(this.party, this.gameMaster);
    return Response.json({});
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

    BroadcastManager.broadcastGameState(this.party, this.gameMaster);
  }

  onClose(connection: Party.Connection<{name?: string}>): void | Promise<void> {
    if (connection === this.NConnection) {
      this.NConnection = null;
    } else if (connection === this.SConnection) {
      this.SConnection = null;
    }
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
        BroadcastManager.broadcastJoinMessage(this.party, sender);
        BroadcastManager.broadcastPresence(this.party);
        break;
      }
    }
  }

  private setConnectionState(connection: Party.Connection, state: object) {
    connection.setState({...connection.state, ...state});
  }
}

Server satisfies Party.Worker;
