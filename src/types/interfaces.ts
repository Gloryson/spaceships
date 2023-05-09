export interface Ship {
  type: string;
  length: number;
}


export interface Cell {
  status: string;
  position: {
    y: number,
    x: number,
    start: boolean
  };
}