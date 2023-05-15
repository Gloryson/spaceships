import { Cell } from '../types/interfaces';


export function checkDestroyedShip (field: Cell[][], row: number, cell: number): boolean {
  for (let i: number = cell; i < 10; i++) {
    if (field[row][i].status === 'ship') return false;
    else if (field[row][i].status != 'hit' || i === 9) {
      for (let j: number = i - 1; j >= 0; j--) {
        if (field[row][j].status === 'ship') return false;
        else if (field[row][j].status != 'hit' || j === 0) return true;
      }
    }
  }
  return true;
}