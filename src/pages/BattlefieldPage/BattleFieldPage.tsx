import { useEffect } from 'react';
import { EnemyBattlefield, EnemyShipList, PlayerBattlefield, PlayerShipList } from '../../components';
import { useAppDispatch } from '../../store/store';
import './BattlefieldPage.scss';
import { setIsEditField } from '../../store/playerFieldSlice';



export function BattlefieldPage () {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsEditField(false));
  }, [])

  return(
    <section className='battlefiled__page'>
      <PlayerShipList />
      <PlayerBattlefield />
      <EnemyBattlefield />
      <EnemyShipList />
    </section>
  )
}