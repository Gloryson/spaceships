import { ArrangementField } from '../../components';
import './ShipArrangementPage.scss';



export function ShipArrangementPage () {

  

  return(
    <section className='ship__arrangement__page'>
      <h1>Arrange your battle space fleet !</h1>
      <ArrangementField />
      <button>READY</button>
    </section>
  )
}