import { Cell } from '../types/interfaces';


export function getNewEnemyShot (field: Cell[][]): Cell | null {
  const targetList: Cell[] = [];
  let exactTarget: Cell | null = null;

  field.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.status === 'hit' && ((x > 0 && row[x - 1].status === 'ship') || (x < 9 && row[x + 1].status === 'ship'))) {
        if (x === 9) exactTarget = row[x - 1];
        else if (x === 0) exactTarget = row[x + 1];
        else exactTarget = changePrevOrLastCell(row[x - 1], row[x + 1]);
      }
      else if (cell.status != 'hit' && cell.status != 'miss' && checkShipFromAboveAndBelow(field, y, x)) {
        targetList.push(cell);
      } 
    })
  });

  return exactTarget ? exactTarget : targetList.length === 0 ? null : targetList[Math.floor(Math.random() * targetList.length)];
}


function changePrevOrLastCell (prev: Cell, last: Cell): Cell {
  const checkStatus = (cell: Cell): boolean => cell.status != 'miss' && cell.status != 'hit';
  if (checkStatus(prev) && checkStatus(last)) return [prev, last][Math.floor(Math.random() * 2)];
  if (checkStatus(prev) && !checkStatus(last)) return prev;
  return last; 
}


function checkShipFromAboveAndBelow (field: Cell[][], row: number, cell: number): boolean {
  const start: number = cell > 0 ? cell - 1 : cell;
  const end: number = cell === 0 ? start + 2 : start + 3;
  if (field[row - 1] && field[row - 1].slice(start, end).some(cell => cell.status === 'hit')) return false;
  if (field[row + 1] && field[row + 1].slice(start, end).some(cell => cell.status === 'hit')) return false;
  return true;
}