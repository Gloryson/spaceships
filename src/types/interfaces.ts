export interface enemyField {
  field: Cell[][];
  ships: Record<string, number>;
  isEnemyShot: boolean;
  isEnemyVictory: boolean;
  playerShotSound: boolean;
  playerExplosionSound: boolean;
  isVolume: boolean;
}

export interface playerField {
  field: Cell[][];
  isDragging: boolean;
  isEditField: boolean;
  ships: Record<string, number>;
  isPlayerVictory: boolean;
  enemyShotSound: boolean;
  enemyExplosionSound: boolean;
  isVolume: boolean;
}

export interface Ship {
  type: string;
  length: number;
  start: boolean;
  dragSection: number;
}

export interface Coordinates {
  y: number;
  x: number;
}

export interface Cell {
  status: string;
  position: Coordinates;
  ship: Ship;
  own: string;
}