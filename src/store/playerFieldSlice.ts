import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '../types/interfaces';
import { checkFreeSpaceForShip, createRandomFieldMatrix } from '../helpers';

interface Field {
  field: Cell[][];
  isDragging: boolean;
  isEditField: boolean;
}

const initialState: Field = {
  field: createRandomFieldMatrix(),
  isDragging: false,
  isEditField: true
}


export const playerFieldSlice = createSlice({
  name: 'playerField',
  initialState,
  reducers: {
    setIsDragging (state, action: PayloadAction<boolean>) {
      state.isDragging = action.payload;
    },

    setIsEditField (state, action: PayloadAction<boolean>) {
      state.isEditField = action.payload;
    },

    setFieldToDragMode (state, action: PayloadAction<Cell>) {
      const shipLength: number = action.payload.ship.length;

      state.field.forEach((row, i) => {
        row.forEach((cell, j) => {
          const y: number = action.payload.position.y;
          const x: number = action.payload.position.x;
          if (cell.status != 'ship') cell.status = 'free';
          if (i === y && j >= x && j < x + shipLength) cell.status = 'free';
        })
      });

      for (let i: number = 0; i < 10; i++) {
        for (let j: number = 0; j <= 10 - shipLength; j++) {
          if(checkFreeSpaceForShip(state.field, i, j, shipLength)) {
            for (let k: number = j; k < j + shipLength; k++) {
              state.field[i][k].status = 'correct';
            }
          }
        }
      };
    },

    setFieldAfterDrop (state, action: PayloadAction<Cell>) {
      const row: number = action.payload.position.y;
      const cell: number = action.payload.position.x;
      const shipLength: number = action.payload.ship.length;
      if (checkFreeSpaceForShip(state.field, row, cell, shipLength)) {
        for (let i: number = cell; i < cell + shipLength; i++) {
          let curr: Cell = state.field[row][i];
          curr.status = 'ship';
          curr.ship.type = action.payload.ship.type;
          curr.ship.length = shipLength;
          curr.ship.start = i === cell;
        }
        state.isDragging = false;
      }
      console.log(JSON.parse(JSON.stringify(state.field)))
    },

  }
})

export const { setIsDragging, setFieldToDragMode, setIsEditField, setFieldAfterDrop } = playerFieldSlice.actions;
export default playerFieldSlice.reducer;