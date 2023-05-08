import { Cell, Ship } from '../types/interfaces';


export function createRandomFieldMatrix (): Cell[][] {

  const field: Cell[][] = Array(10).fill(0).map((_, rowIndex) => {
    return Array(10).fill(0).map((_, cellIndex) => {
      return {status: 'free', position: {y: rowIndex, x: cellIndex}}
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
    } while (field[row].slice(cell, cell + ship.length).some(cell => cell.status != 'free'));

    for (let i: number = cell; i < cell + ship.length; i++) {
      field[row][i].status = ship.type;
      if (field[row - 1]) {
        field[row - 1][i].status = 'nearby';
        if (field[row - 1][i - 1]) field[row - 1][i - 1].status = 'nearby';
        if (field[row - 1][i + 1]) field[row - 1][i + 1].status = 'nearby';
      }
      if (field[row + 1]) {
        field[row + 1][i].status = 'nearby';
        if (field[row + 1][i - 1]) field[row + 1][i - 1].status = 'nearby';
        if (field[row + 1][i + 1]) field[row + 1][i + 1].status = 'nearby';
      }
    }
    if (field[row][cell - 1]) field[row][cell - 1].status = 'nearby';
    if (field[row][cell + ship.length]) field[row][cell + ship.length].status = 'nearby';

  })

  return field;
}