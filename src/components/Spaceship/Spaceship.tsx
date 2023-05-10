import { useState } from 'react';
import { Cell } from '../../types/interfaces';
import './Spaceship.scss';


export function Spaceship ( {cell}: {cell: Cell} ) {

  const [pos, setPos] = useState({x: cell.position.x * 10, y: cell.position.y * 10});
  const [m, setM] = useState({mX: 0, mY: 0});

  return(
    <div
      draggable 
      className={cell.ship.type}
      style={{top: `${pos.y}%`, left: `${pos.x}%`}}
      onDragStart={(e) => {
        setM({mX: e.clientX, mY: e.clientY});
      }}
      onDrag={(e) => {
        setPos(pos => ({x: cell.position.x * 10 + (e.clientX - m.mX) * 0.2, y: cell.position.y * 10 + (e.clientY - m.mY) * 0.2}));
      }}
      onDragEnd={() => setPos(() => ({x: cell.position.x * 10, y: cell.position.y * 10}))}
    ></div>
  )
}