import { Cell, Ship } from '../types/interfaces';
import { checkFreeSpaceForShip } from './checkFreeSpaceForShip';


export function createRandomFieldMatrix (): Cell[][] {

  const field: Cell[][] = Array(10).fill(0).map((_, rowIndex) => {
    return Array(10).fill(0).map((_, cellIndex) => {
      return {status: 'free', position: {y: rowIndex, x: cellIndex, start: false}}
    })
  })
  
  const ships: Ship[] = [
    {type: 'flagship', length: 4},
    {type: 'battleship', length: 3},
    {type: 'battleship', length: 3},
    {type: 'cruiser', length: 2},
    {type: 'cruiser', length: 2},
    {type: 'cruiser', length: 2},
    {type: 'destroyer', length: 1},
    {type: 'destroyer', length: 1},
    {type: 'destroyer', length: 1},
    {type: 'destroyer', length: 1}
  ];

  ships.forEach(ship => {
    let row: number, cell: number;
    do {
      row = Math.floor(Math.random() * 10);
      cell = Math.floor(Math.random() * (11 - ship.length));
    } while (!checkFreeSpaceForShip(field, row, cell, ship.length));

    for (let i: number = cell; i < cell + ship.length; i++) {
      field[row][i].status = ship.type;
      if (i === cell) field[row][i].position.start = true;
    }
  })

  return field;
}