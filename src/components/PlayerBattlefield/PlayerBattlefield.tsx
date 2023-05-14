import { Fragment } from 'react';
import { FieldCell, Spaceship } from '../../components';
import { useAppSelector } from '../../store/store';
import { Cell } from '../../types/interfaces';
import './PlayerBattlefield.scss';



export function PlayerBattlefield () {

  const field: Cell[][] = useAppSelector(state => state.playerField.field);

  
  return(
    <div className='player__battlefield'>
      {
        field.map((row, y) => row.map((cell, x) => {
          return cell.ship.start ? (
            <Fragment  key={'pbff' + y + x}>

              <FieldCell  key={'pbfcs' + y + x}  cell={cell} />
              <Spaceship  key={'pbfs' + y + x}  cell={cell} />

            </Fragment>

          ) : (

            <FieldCell  key={'pbfc' + y + x}  cell={cell} />

          )
        }))
      }
    </div>
  )
}