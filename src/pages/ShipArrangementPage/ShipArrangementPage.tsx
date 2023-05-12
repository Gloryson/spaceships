import { ArrangementField } from '../../components';
import { setIsEditField } from '../../store/playerFieldSlice';
import { useAppDispatch } from '../../store/store';
import './ShipArrangementPage.scss';



export function ShipArrangementPage () {

  const dispatch = useAppDispatch();

  return(
    <section className='ship__arrangement__page'>

      <h1>Arrange your battle space fleet !</h1>

      <ArrangementField />

      <button onClick={() => dispatch(setIsEditField(false))}>READY</button>
      
    </section>
  )
}