import { FieldCell } from '..';
import { useAppSelector } from '../../store/store';
import './EnemyBattlefield.scss';



export function EnemyBattlefield () {

  const { field } = useAppSelector(state => state.enemyField);

  
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