import { Fragment } from 'react';
import { FieldCell, Spaceship } from '../../components';
import { useAppSelector } from '../../store/store';
import { Cell } from '../../types/interfaces';
import './ArrangementField.scss';



export function ArrangementField () {

  const field: Cell[][] = useAppSelector(state => state.playerField.field);

  
  return(
    <div
      className='arrangement__field'
      onDragOver={e => e.preventDefault()}
    >
      {
        field.map((row, y) => row.map((cell, x) => {
          return cell.ship.start ? (
            <Fragment  key={'f' + y + x}>

              <FieldCell  key={'cs' + y + x}  cell={cell} />
              <Spaceship  key={'s' + y + x}  cell={cell} />

            </Fragment>

          ) : (

            <FieldCell  key={'c' + y + x}  cell={cell} />

          )
        }))
      }
    </div>
  )
}