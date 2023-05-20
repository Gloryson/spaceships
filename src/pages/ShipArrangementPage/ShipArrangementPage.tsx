import { Link } from 'react-router-dom';
import { PlayerBattlefield } from '../../components';
import { setIsEditField, setNewPlayerField } from '../../store/playerFieldSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './ShipArrangementPage.scss';



export function ShipArrangementPage () {

  const { isEditField } = useAppSelector(state => state.playerField);
  const dispatch = useAppDispatch();

  return(
    <section className='ship__arrangement__page'>

      <h1>Arrange your battle space fleet !</h1>

      <PlayerBattlefield size='400px'/>

      <div
        className='refresh'
        onClick={() => {
          if (isEditField) dispatch(setNewPlayerField());
        }}
      ></div>

      <Link to='/battle'>
        <button onClick={() => dispatch(setIsEditField(false))}>READY</button>
      </Link>
      
    </section>
  )
}