import { checkFreeSpaceForShip } from './checkFreeSpaceForShip';
import { Cell, Ship } from '../types/interfaces';


export function createRandomFieldMatrix (): Cell[][] {

  const field: Cell[][] = Array(10).fill(0).map((_, rowIndex) => {
    return Array(10).fill(0).map((_, cellIndex) => {
      return {
        status: 'free', 
        position: {y: rowIndex, x: cellIndex}, 
        ship: {type: '', length: 0, start: false, dragSection: 0}
      }
    })
  })
  
  const ships: Ship[] = [
    { type: 'flagship', length: 4, start: false, dragSection: 0 },
    { type: 'battleship', length: 3, start: false, dragSection: 0 },
    { type: 'cruiser', length: 2, start: false, dragSection: 0 },
    { type: 'destroyer', length: 1, start: false, dragSection: 0 }
  ];


  ships.forEach((ship: Ship, index: number) => {
    let amount = index + 1;
    while (amount > 0) {
      let row: number, cell: number;

      do {
        row = Math.floor(Math.random() * 10);
        cell = Math.floor(Math.random() * (11 - ship.length));
      } while (!checkFreeSpaceForShip(field, row, cell, ship.length));

      for (let i: number = cell; i < cell + ship.length; i++) {
        let curr: Cell = field[row][i];
        curr.status = 'ship';
        curr.ship.type = ship.type;
        curr.ship.length = ship.length;
        curr.ship.start = i === cell;
      }
      amount -= 1;
    }
  })

  return field;
}