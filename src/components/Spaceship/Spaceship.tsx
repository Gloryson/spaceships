import { useState } from 'react';
import { Cell } from '../../types/interfaces';
import { useAppDispatch } from '../../store/store';
import { setDraggableShip, setIsDragging } from '../../store/playerFieldSlice';
import './Spaceship.scss';


export function Spaceship ( {cell}: {cell: Cell} ) {

  const dispatch = useAppDispatch();
  
  const [position, setPosition] = useState({
    startX: 0,
    startY: 0,
    x: cell.position.x * 10,
    y: cell.position.y * 10,
    z: 10
  })


  return(
    <div

      draggable 

      className={cell.ship.type}

      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
        zIndex: position.z
      }}

      onDragStart={(e) => {
        dispatch(setIsDragging(true))
        dispatch(setDraggableShip(cell))
        setPosition(pos => ({
          ...pos,
          startX: e.clientX,
          startY: e.clientY
        }));
      }}

      onDrag={(e) => {
        setPosition(pos => ({
          ...pos,
          x: cell.position.x * 10 + (e.clientX - pos.startX) * 0.2,
          y: cell.position.y * 10 + (e.clientY - pos.startY) * 0.2,
          z: 11
        }));
      }}

      onDragEnd={() => {
        dispatch(setIsDragging(false))
        setPosition(pos => ({
          ...pos,
          x: cell.position.x * 10,
          y: cell.position.y * 10,
          z: 10
        }))
      }}

    ></div>
  )
}