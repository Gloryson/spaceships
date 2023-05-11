import { Cell } from '../../types/interfaces';
import { FieldCell, Spaceship } from '../../components';
import { useAppSelector } from '../../store/store';
import './ArrangementField.scss';



export function ArrangementField () {

  const field: Cell[][] = useAppSelector(state => state.playerField.field);

  return(
    <div className='arrangement__field' onDragOver={(e) => e.preventDefault()}>
      {
        field.map(row => row.map(cell => {
          if (cell.ship.start) {
            return <>
              <FieldCell cell={cell}/>
              <Spaceship cell={cell}/>
            </>
          }
          return <FieldCell cell={cell}/>
        }))
      }
    </div>
  )
}