import { useState } from 'react';
import { Cell } from '../../types/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setFieldAfterDrop, setFieldToDragMode, setIsDragging } from '../../store/playerFieldSlice';
import './Spaceship.scss';


export function Spaceship ( {cell}: {cell: Cell} ) {

  const dispatch = useAppDispatch();
  const { isEditField, isDragging } = useAppSelector(state => state.playerField);
  
  const [position, setPosition] = useState({
    startX: 0,
    startY: 0,
    x: cell.position.x * 10,
    y: cell.position.y * 10,
    z: 0,
    visible: true
  })


  return isEditField ? (
    
    <div
      draggable 
      className={cell.ship.type + `  ${position.visible ? '' : 'off'}`}
      style={{ top: `${position.y}%`, left: `${position.x}%`, zIndex: position.z }}
      onDragStart={(e) => {
        const data: Cell = {...cell, ship: {... cell.ship, dragSection: Math.floor(e.nativeEvent.offsetX / 50)}}
        e.dataTransfer.setData('draggableShip', JSON.stringify(data))
        dispatch(setIsDragging(true))
        dispatch(setFieldToDragMode(cell))
        setPosition(pos => ({ ...pos, startX: e.clientX, startY: e.clientY }));
      }}
      onDrag={(e) => {
        setPosition(pos => ({
          ...pos,
          x: cell.position.x * 10 + (e.clientX - pos.startX) * 0.2,
          y: cell.position.y * 10 + (e.clientY - pos.startY) * 0.2,
          z: -1
        }));
      }}
      onDragEnd={() => {
        if (isDragging) {
          setPosition(pos => ({ ...pos, x: cell.position.x * 10, y: cell.position.y * 10, z: 0 }))
          dispatch(setFieldAfterDrop(cell));
        }
        if (!isDragging) setPosition(pos => ({ ...pos, visible: false}));
      }}
    ></div>

  ) : (

    <div 
      className={cell.ship.type}
      style={{ top: `${position.y}%`, left: `${position.x}%`, zIndex: position.z }}
    ></div>

  )
}