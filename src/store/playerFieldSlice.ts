import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkDestroyedShip, checkFreeSpaceForShip, createRandomFieldMatrix, getMissesAroundShip } from '../helpers';
import { Cell, Coordinates, playerField } from '../types/interfaces';
import explosionSoundPath from '../assets/sounds/explosion.mp3';
import enemyShotSoundPath from '../assets/sounds/enemy-shot.mp3';


const initialState: playerField = {
  field: createRandomFieldMatrix('player'),
  isDragging: false,
  isEditField: true,
  ships: { 'destroyer': 4, 'cruiser': 3, 'battleship': 2, 'flagship': 1 },
  isPlayerVictory: true,
  enemyShotSound: new Audio(enemyShotSoundPath),
  explosionSound: new Audio(explosionSoundPath),
  isVolume: true
}


export const playerFieldSlice = createSlice({
  name: 'playerField',
  initialState,
  reducers: {
    setIsEditField (state, action: PayloadAction<boolean>) {
      state.isEditField = action.payload;
    },

    setFieldToDragMode (state, action: PayloadAction<Cell>) {
      state.isDragging = true;

      const shipLength: number = action.payload.ship.length;

      state.field.forEach((row, i) => {
        row.forEach((cell, j) => {
          const y: number = action.payload.position.y;
          const x: number = action.payload.position.x;
          if (cell.status != 'ship' || (i === y && j >= x && j < x + shipLength)) cell.status = 'free';
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

        state.field.forEach(row => {
          row.forEach(cell => {
            if (cell.status != 'ship') cell.ship = { type: '', length: 0, start: false, dragSection: 0 };
          })
        });

        state.isDragging = false;
      };
    },

    handleEnemyShot (state, action: PayloadAction<Cell>) {
      const row: number = action.payload.position.y;
      const cell: number = action.payload.position.x;
      const field: Cell[][] = state.field;
      const currCell: Cell = field[row][cell];
      if (currCell.status === 'ship') {
        state.explosionSound.pause();
        state.explosionSound.currentTime = 0.0;
        if (state.isVolume) state.explosionSound.play();
        currCell.status = 'hit';
        if (checkDestroyedShip(field, row, cell)) {
          const coordinates: Coordinates[] = getMissesAroundShip(field, row, cell);
          coordinates.forEach(position => {
            field[position.y][position.x].status = 'miss';
          })
          state.ships[currCell.ship.type] -= 1;
          if (Object.values(state.ships).every(ship => !ship)) state.isPlayerVictory = false;
        }
      }
      else {
        state.enemyShotSound.pause();
        state.enemyShotSound.currentTime = 0.0;
        if (state.isVolume) state.enemyShotSound.play();
        currCell.status = 'miss';
      }
    },

    setNewPlayerField (state) {
      state.field = createRandomFieldMatrix('player');
      state.ships = { 'destroyer': 4, 'cruiser': 3, 'battleship': 2, 'flagship': 1 };
      state.isEditField = true;
      state.isPlayerVictory = true;
    },

    setPlayerFieldVolume (state, action: PayloadAction<boolean>) {
      state.isVolume = action.payload;
    }

  }
})

export const {
  setIsEditField, setFieldToDragMode, setFieldAfterDrop, handleEnemyShot, setNewPlayerField, setPlayerFieldVolume
} = playerFieldSlice.actions;

export default playerFieldSlice.reducer;