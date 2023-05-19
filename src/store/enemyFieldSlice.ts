import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkDestroyedShip, createRandomFieldMatrix, getMissesAroundShip } from '../helpers';
import { Cell, Coordinates, enemyField } from '../types/interfaces';


const initialState: enemyField = {
  field: createRandomFieldMatrix('enemy'),
  ships: { 'destroyer': 4, 'cruiser': 3, 'battleship': 2, 'flagship': 1 },
  isEnemyShot: false,
  isEnemyVictory: true,
  playerShotSound: false,
  playerExplosionSound: false,
  isVolume: true
};


export const enemyFieldSlice = createSlice({
  name: 'enemyField',
  initialState,
  reducers: {
    handlePlayerShot (state, action: PayloadAction<Cell>) {
      const row: number = action.payload.position.y;
      const cell: number = action.payload.position.x;
      const field: Cell[][] = state.field;
      const currCell: Cell = field[row][cell];
      if (currCell.status === 'ship') {
        if (state.isVolume) state.playerExplosionSound = true;
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
        if (state.isVolume) state.playerShotSound = true;
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
    },
  
    setEnemyFieldVolume (state, action: PayloadAction<boolean>) {
      state.isVolume = action.payload;
    },

    finishPlayerSound (state) {
      state.playerShotSound = false;
      state.playerExplosionSound = false;
    }

  }
})

export const {
  handlePlayerShot, setIsEnemyShot, setNewEnemyField, setEnemyFieldVolume, finishPlayerSound
} = enemyFieldSlice.actions;

export default enemyFieldSlice.reducer;