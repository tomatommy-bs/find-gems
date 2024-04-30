export const CHEST_DIRECTION = {
  NE: 'NE',
  NW: 'NW',
  SE: 'SE',
  SW: 'SW',
} as const;
export type ChestDirection =
  (typeof CHEST_DIRECTION)[keyof typeof CHEST_DIRECTION];
