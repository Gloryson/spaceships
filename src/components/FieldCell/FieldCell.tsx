import { useAppSelector } from '../../store/store';
import { Cell } from '../../types/interfaces';
import './FieldCell.scss';



export function FieldCell ( {cell}: {cell: Cell} ) {

  const { isDragging } = useAppSelector(state => state.playerField);

  return(
    <div className={`cell  ${isDragging && cell.status === 'GO' ? 'cell__correct' : ''}`}></div>
  )
}