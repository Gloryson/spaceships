import { Cell } from '../types/interfaces';


export function getNewEnemyShot (field: Cell[][]): Cell | null {
  const targetList: Cell[] = [];

  field.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.status != 'hit' && cell.status != 'miss' && checkShipFromAboveAndBelow(field, y, x)) {
        targetList.push(cell);
      } 
    })
  });

  if (targetList.length === 0) return null;

  const randomCell: Cell = targetList[Math.floor(Math.random() * targetList.length)];

  return randomCell;
}



function checkShipFromAboveAndBelow (field: Cell[][], row: number, cell: number): boolean {
  const start: number = cell > 0 ? cell - 1 : cell;
  if (field[row - 1] && field[row - 1].slice(start, start + 3).some(cell => cell.status === 'hit')) return false;
  if (field[row + 1] && field[row + 1].slice(start, start + 3).some(cell => cell.status === 'hit')) return false;
  return true;
}