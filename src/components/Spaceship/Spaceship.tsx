import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setFieldAfterDrop, setFieldToDragMode } from '../../store/playerFieldSlice';
import { Cell } from '../../types/interfaces';
import './Spaceship.scss';


export function Spaceship ( {cell}: {cell: Cell} ) {

  const [zIndexState, setZIndexState] = useState(0);
  const { isEditField } = useAppSelector(state => state.playerField);
  const dispatch = useAppDispatch();


  return isEditField ? (
    
    <div
      draggable 
      className={cell.ship.type}

      style={{
        top: `${cell.position.y * 10}%`,
        left: `${cell.position.x * 10}%`,
        zIndex: zIndexState
      }}

      onDragStart={e => {
        const data: Cell = { ...cell, ship: { ... cell.ship, dragSection: Math.floor(e.nativeEvent.offsetX / 40) } };
        e.dataTransfer.setData('draggableShip', JSON.stringify(data));
        dispatch(setFieldToDragMode(cell));
      }}

      onDrag={() => setZIndexState(-1)}

      onDragEnd={() => {
        setZIndexState(0);
        dispatch(setFieldAfterDrop(cell));
      }}
    ></div>

  ) : (

    <div
      className={cell.ship.type}
      style={{
        top: `${cell.position.y * 10}%`,
        left: `${cell.position.x * 10}%`,
        zIndex: -1,
        cursor: 'default'
      }}   
    ></div>

  )
}