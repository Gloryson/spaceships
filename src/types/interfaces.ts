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