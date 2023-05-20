import { EnemyBattlefield, EnemyShipList, PlayerBattlefield, PlayerShipList } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setPlayerFieldVolume } from '../../store/playerFieldSlice';
import { setEnemyFieldVolume } from '../../store/enemyFieldSlice';
import { useBot } from '../../hooks';
import './BattlefieldPage.scss';



export function BattlefieldPage () {

  const { isVolume } = useAppSelector(state => state.enemyField);
  const dispatch = useAppDispatch();


  useBot();


  return(
    <section className='battlefiled__page'>
      <PlayerShipList />
      <PlayerBattlefield size='calc(100vw / 4)' />
      <EnemyBattlefield />
      <EnemyShipList />
      <button 
        className={isVolume ? 'volume' : 'volume-off'}
        onClick={() => {
          dispatch(setPlayerFieldVolume(!isVolume));
          dispatch(setEnemyFieldVolume(!isVolume));
        }}
      ></button>
    </section>
  )
}