import { Cell } from '../types/interfaces';


export function checkFreeSpaceForShip (field: Cell[][], row: number, cell: number, shipLength: number): boolean {
  const start: number = cell - 1 > - 1 ? cell - 1 : 0;
  const end: number = cell + shipLength + 1;

  for (let i: number = row - 1; i <= row + 1; i++) {
    if (field[i] && !field[i].slice(start, end).every(cell => cell.status === 'free' || cell.status === 'nearby' || cell.status === 'GO')) return false;
  }
  
  return true;
}