import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkDestroyedShip, createRandomFieldMatrix, getMissesAroundShip } from '../helpers';
import { Cell, Coordinates } from '../types/interfaces';


interface Field {
  field: Cell[][];
  ships: Record<string, number>;
  isEnemyShot: boolean;
  isEnemyVictory: boolean;
}

const initialState: Field = {
  field: createRandomFieldMatrix('enemy'),
  ships: { 'destroyer': 4, 'cruiser': 3, 'battleship': 2, 'flagship': 1 },
  isEnemyShot: false,
  isEnemyVictory: true
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
          if (Object.values(state.ships).every(ship => !ship)) state.isEnemyVictory = false;
        }
      }
      else {
        currCell.status = 'miss';
        state.isEnemyShot = true;
      }
    },


    setIsEnemyShot (state, action: PayloadAction<boolean>) {
      state.isEnemyShot = action.payload;
    },


    setNewEnemyField (state) {
      state.field = createRandomFieldMatrix('enemy');
      state.ships = { 'destroyer': 4, 'cruiser': 3, 'battleship': 2, 'flagship': 1 };
      state.isEnemyShot = false;
      state.isEnemyVictory = true;
    }
    

  }
})

export const { handleShot, setIsEnemyShot, setNewEnemyField } = enemyFieldSlice.actions;
export default enemyFieldSlice.reducer;