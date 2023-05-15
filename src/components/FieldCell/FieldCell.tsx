import { setFieldAfterDrop } from '../../store/playerFieldSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Cell } from '../../types/interfaces';
import { handleShot } from '../../store/enemyFieldSlice';
import './FieldCell.scss';



export function FieldCell ( {cell}: {cell: Cell} ) {

  const { isDragging, isEditField } = useAppSelector(state => state.playerField);
  const dispatch = useAppDispatch();

  return isEditField ? (

    <div
      className={`cell  ${isDragging && cell.status === 'correct' ? 'cell__correct' : ''}`}

      onDragStart={e => e.preventDefault()}

      onDrop={e => {
        const cellData: Cell = JSON.parse(e.dataTransfer.getData('draggableShip'));
        const x: number = cell.position.x - cellData.ship.dragSection;
        const y: number = cell.position.y;
        if (x >= 0 && x + cellData.ship.length <= 10) {
          cellData.position.x = x;
          cellData.position.y = y;
          dispatch(setFieldAfterDrop(cellData));
        }
      }}
    ></div>

  ) : (

    <div
      className={'cell  ' + cell.status}
      onClick={() => {
        if (cell.own === 'enemy' && cell.status != 'hit' && cell.status != 'miss') dispatch(handleShot(cell));
      }}
    ></div>

  )
}