import { createRandomFieldMatrix } from '../../helpers';
import { Cell } from '../../types/interfaces';
import './ArrangementField.scss';



export function ArrangementField () {

  const field: Cell[][] = createRandomFieldMatrix();

  return(
    <div className="arrangement__field">
      {
        field.map(e => e.map(g => {
          if (g.position.start) {
            return <div className={g.status} style={{top: `${g.position.y * 10}%`, left: `${g.position.x * 10}%`}}></div>
          }
        }))
      }
      {   
        field.map(e => e.map(g => {
          return <div className='cell'></div>
        }))
      }
    </div>
  )
}