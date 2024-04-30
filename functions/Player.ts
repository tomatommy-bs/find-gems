type PlayerPosition = 'N' | 'S';

export class Player {
  name: string;
  position: PlayerPosition;

  constructor(args: {name: string; position: PlayerPosition}) {
    this.name = args.name;
    this.position = args.position;
  }
}
