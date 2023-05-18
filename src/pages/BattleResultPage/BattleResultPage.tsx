import { useNavigate } from 'react-router-dom';
import { setNewPlayerField } from '../../store/playerFieldSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setNewEnemyField } from '../../store/enemyFieldSlice';
import './BattleResultPage.scss';



export function BattleResultPage () {

  const { isPlayerVictory } = useAppSelector(state => state.playerField);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return(
    <section className='battle__result__page'>
      <h1>{ isPlayerVictory ? 'VICTORY' : 'DEFEAT' }</h1>
      <button onClick={() => {
        dispatch(setNewPlayerField());
        dispatch(setNewEnemyField());
        navigate('/');
      }}>PLAY AGAIN</button>
    </section>
  )
}