export interface Ship {
  type: string;
  length: number;
  start: boolean;
  dragSection: number;
}

export interface Cell {
  status: string;
  position: { y: number, x: number };
  ship: Ship;
}