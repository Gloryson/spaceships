import { setFieldAfterDrop } from '../../store/playerFieldSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Cell } from '../../types/interfaces';
import './FieldCell.scss';



export function FieldCell ( {cell}: {cell: Cell} ) {

  const { isDragging } = useAppSelector(state => state.playerField);
  const dispatch = useAppDispatch();

  return(
    <div 
      className={`cell  ${isDragging && cell.status === 'correct' ? 'cell__correct' : ''}`}
      onDrop={(e) => {
        const cellData: Cell = JSON.parse(e.dataTransfer.getData('draggableShip'));
        cellData.position.x = cell.position.x - cellData.ship.dragSection;
        cellData.position.y = cell.position.y;
        dispatch(setFieldAfterDrop(cellData));
      }}
    ></div>
  )
}