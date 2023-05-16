import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkDestroyedShip, createRandomFieldMatrix, getMissesAroundShip } from '../helpers';
import { Cell, Coordinates } from '../types/interfaces';


type Field = {
  field: Cell[][];
  ships: Record<string, number>;
  isEnemyShot: boolean;
}

const initialState: Field = {
  field: createRandomFieldMatrix('enemy'),
  ships: { 'destroyer': 4, 'cruiser': 3, 'battleship': 2, 'flagship': 1 },
  isEnemyShot: false
};


export const enemyFieldSlice = createSlice({
  name: 'enemyField',
  initialState,
  reducers: {

    handleShot (state, action: PayloadAction<Cell>) {
      const row: number = action.payload.position.y;
      const cell: number = action.payload.position.x;
      const field: Cell[][] = state.field;
      const currCell: Cell = field[row][cell];
      if (currCell.status === 'ship') {
        currCell.status = 'hit';
        if (checkDestroyedShip(field, row, cell)) {
          const coordinates: Coordinates[] = getMissesAroundShip(field, row, cell);
          coordinates.forEach(position => {
            field[position.y][position.x].status = 'miss';
          })
          state.ships[currCell.ship.type] -= 1;
        }
      }
      else {
        currCell.status = 'miss';
        state.isEnemyShot = true;
      }
    },


    setIsEnemyShot (state, action: PayloadAction<boolean>) {
      state.isEnemyShot = action.payload;
    }
    

  }
})

export const { handleShot, setIsEnemyShot } = enemyFieldSlice.actions;
export default enemyFieldSlice.reducer;