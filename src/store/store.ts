import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import playerFieldSlice from './playerFieldSlice';
import enemyFieldSlice from './enemyFieldSlice';


export const store = configureStore({
  reducer: {
    playerField: playerFieldSlice,
    enemyField: enemyFieldSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;