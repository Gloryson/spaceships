import { Cell, Coordinates } from '../types/interfaces';


export function getMissesAroundShip ( field: Cell[][], row: number, cell: number ): Coordinates[] { 
  const result: Coordinates[] = [];

  while (!field[row][cell].ship.start) cell--;
  
  const length: number = field[row][cell].ship.length;
  const startCell: number = cell > 0 ? cell - 1 : cell;
  const startRow: number = row > 0 ? row - 1 : row;
  const endCell: number = cell + length < 10 ? cell + length : 9;
  const endRow: number = row < 9 ? row + 1 : row;

  for (let i: number = startCell; i <= endCell; i++) {
    for (let j: number = startRow; j <= endRow; j++) {
      if (field[j][i].status != 'hit') result.push({ y: field[j][i].position.y, x: field[j][i].position.x });
    }
  }

  return result;
}