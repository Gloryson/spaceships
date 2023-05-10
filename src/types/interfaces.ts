export interface Ship {
  type: string;
  length: number;
  start: boolean;
}

export interface Cell {
  status: string;
  position: { y: number, x: number };
  ship: Ship;
}