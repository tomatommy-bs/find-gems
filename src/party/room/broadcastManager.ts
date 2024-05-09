import type * as Party from 'partykit/server';
import {
  ChatMessage,
  connectionState,
  ForceClientActMessage,
  ROOM_MESSAGE_TYPE,
  SyncGameMessage,
  SyncPresenceMessage,
  zodRoomApiDto,
} from './type';
import {FORCE_CLIENT_ACT_MESSAGE, WAITING_FOR_STATE} from '@/src/types/game';
import {GameMaster} from '@/src/functions/GameMaster';

export class BroadcastManager {
  static async broadcastForceClientAct(
    party: Party.Party,
    command: keyof typeof FORCE_CLIENT_ACT_MESSAGE
  ) {
    const resDataForceClientAct: ForceClientActMessage = {
      type: ROOM_MESSAGE_TYPE.forceClient,
      sender: 'system',
      message: command,
    };
    party.broadcast(JSON.stringify(resDataForceClientAct));
  }

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

  static async broadcastJoinMessage(
    party: Party.Party,
    connection: Party.Connection<connectionState>
  ) {
    const name = connection.state?.name;
    const data: ChatMessage = {
      type: 'chat',
      messageType: 'presence',
      sender: 'system',
      message: `${name} joined`,
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

  static async broadcastGameState(
    party: Party.Party,
    gameMaster: GameMaster | null
  ) {
    if (!gameMaster) return;
    const connections = Array.from(
      party.getConnections<{name?: string; position?: 'N' | 'S'}>()
    );
    const nConnection = connections.find(c => c.state?.position === 'N');
    const sConnection = connections.find(c => c.state?.position === 'S');
    if (nConnection === undefined || sConnection === undefined) return;

    const dataForN: SyncGameMessage = {
      type: ROOM_MESSAGE_TYPE.syncGame,
      sender: 'system',
      message: 'game state updated',
      gameState: {
        chestInfo: gameMaster.getChestInfoByPlayer('N'),
        waitingFor: gameMaster.whatShouldDoNext(),
        position: 'N',
        score: gameMaster.score,
      },
    };
    const dataForS: SyncGameMessage = {
      type: ROOM_MESSAGE_TYPE.syncGame,
      sender: 'system',
      message: 'game state updated',
      gameState: {
        chestInfo: gameMaster.getChestInfoByPlayer('S'),
        waitingFor: gameMaster.whatShouldDoNext(),
        position: 'S',
        score: gameMaster.score,
      },
    };
    party.broadcast(JSON.stringify(dataForN), [sConnection.id]);
    party.broadcast(JSON.stringify(dataForS), [nConnection.id]);
  }
}
