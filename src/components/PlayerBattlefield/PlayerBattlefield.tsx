import { Fragment } from 'react';
import { FieldCell, Spaceship } from '../../components';
import { useAppSelector } from '../../store/store';
import './PlayerBattlefield.scss';



export function PlayerBattlefield ( { size } : { size: string } ) {

  const { field } = useAppSelector(state => state.playerField);

  
  return(
    <div
      className='player__battlefield'
      style={{ width: size, height: size }}
      onDragOver={e => e.preventDefault()}
    >
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