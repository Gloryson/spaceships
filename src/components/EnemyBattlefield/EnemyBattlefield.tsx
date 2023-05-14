import { FieldCell } from '..';
import { useAppSelector } from '../../store/store';
import { Cell } from '../../types/interfaces';
import './EnemyBattlefield.scss';



export function EnemyBattlefield () {

  const field: Cell[][] = useAppSelector(state => state.playerField.field);

  
  return(
    <div className='enemy__battlefield'>
      {
        field.map((row, y) => row.map((cell, x) => {
          return(
            <FieldCell  key={'ebf' + y + x}  cell={cell} />
          )
        }))
      }
    </div>
  )
}