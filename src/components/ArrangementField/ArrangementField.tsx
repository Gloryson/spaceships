import { createRandomFieldMatrix } from '../../helpers';
import { Cell } from '../../types/interfaces';
import './ArrangementField.scss';



export function ArrangementField () {

  const field: Cell[][] = createRandomFieldMatrix();

  return(
    <div className="arrangement__field">
      <div className="ship"></div>
      {field.map(e => e.map(g => {
        return <div className='cell' onClick={() => console.log(g.position)}>{g.status === 'free' ? '' : g.status === 'nearby' ? '.' : g.status[0]}</div>
      }))}
    </div>
  )
}