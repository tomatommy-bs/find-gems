import _ from 'lodash';

export const PLAYER_POSITION = {
  N: 'N',
  S: 'S',
} as const;

export type PlayerPosition =
  (typeof PLAYER_POSITION)[keyof typeof PLAYER_POSITION];

export class Player {
  name: string;
  position: PlayerPosition;
  id: string;

  constructor(args: {name: string; position: PlayerPosition; id?: string}) {
    this.name = args.name;
    this.position = args.position;
    this.id = args.id || _.uniqueId();
  }
}
