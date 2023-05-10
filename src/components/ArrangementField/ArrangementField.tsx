import { createRandomFieldMatrix } from '../../helpers';
import { Cell } from '../../types/interfaces';
import { FieldCell, Spaceship } from '../../components';
import './ArrangementField.scss';



export function ArrangementField () {

  const field: Cell[][] = createRandomFieldMatrix();

  return(
    <div className='arrangement__field' onDragOver={(e) => e.preventDefault()}>
      {
        field.map(row => row.map(cell => {
          if (cell.ship.start) {
            return <>
              <Spaceship cell={cell}/>
              <FieldCell />
            </>
          }
          return <FieldCell />
        }))
      }
    </div>
  )
}