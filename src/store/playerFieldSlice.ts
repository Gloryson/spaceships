import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '../types/interfaces';
import { checkFreeSpaceForShip, createRandomFieldMatrix } from '../helpers';

interface Field {
  field: Cell[][];
  isDragging: boolean;
}

const initialState: Field = {
  field: createRandomFieldMatrix(),
  isDragging: false
}


export const playerFieldSlice = createSlice({
  name: 'playerField',
  initialState,
  reducers: {
    setIsDragging (state, action: PayloadAction<boolean>) {
      state.isDragging = action.payload;
    },
    setDraggableShip (state, action: PayloadAction<Cell>) {
      const fieldCell: Cell = action.payload;
      const row: number = fieldCell.position.y;
      const cell: number = fieldCell.position.x;
      const shipLength: number = fieldCell.ship.length;
      for (let i: number = cell; i < cell + shipLength; i++) {
        state.field[row][cell].status = 'free';
      }
      for (let i: number = 0; i < 10; i++) {
        for (let j: number = 0; j < 10; j++) {
          if (state.field[i][j].status != 'ship') state.field[i][j].status = 'free';
          if (state.field[i][j].status === 'ship') {
            if (state.field[i][j + 1] && state.field[i][j + 1].status != 'ship') state.field[i][j + 1].status = 'nearby';
            if (state.field[i][j - 1] && state.field[i][j - 1].status != 'ship') state.field[i][j - 1].status = 'nearby';
            if (state.field[i - 1]) {
              if (state.field[i - 1][j + 1] && state.field[i - 1][j + 1].status != 'ship') state.field[i - 1][j + 1].status = 'nearby';
              if (state.field[i - 1][j] && state.field[i - 1][j].status != 'ship') state.field[i - 1][j].status = 'nearby';
              if (state.field[i - 1][j - 1] && state.field[i - 1][j - 1].status != 'ship') state.field[i - 1][j - 1].status = 'nearby';
            }
            if (state.field[i + 1]) {
              if (state.field[i + 1][j + 1] && state.field[i + 1][j + 1].status != 'ship') state.field[i + 1][j + 1].status = 'nearby';
              if (state.field[i + 1][j] && state.field[i + 1][j].status != 'ship') state.field[i + 1][j].status = 'nearby';
              if (state.field[i + 1][j - 1] && state.field[i + 1][j - 1].status != 'ship') state.field[i + 1][j - 1].status = 'nearby';
            }
          }
        }
      }
      for (let i: number = 0; i < 10; i++) {
        for (let j: number = 0; j <= 10 - shipLength; j++) {
          if(checkFreeSpaceForShip(state.field, i, j, shipLength)) {
            for (let k: number = j; k < j + shipLength; k++) {
              let curr: Cell = state.field[i][k];
              curr.status = 'GO';
            }
          }
        }
      }
    }
  },
})

export const { setIsDragging, setDraggableShip } = playerFieldSlice.actions;
export default playerFieldSlice.reducer;