import { useEffect } from 'react';
import { EnemyBattlefield, EnemyShipList, PlayerBattlefield, PlayerShipList } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getNewEnemyShot } from '../../helpers/getNewEnemyShot';
import { handleEnemyShot } from '../../store/playerFieldSlice';
import { setIsEnemyShot } from '../../store/enemyFieldSlice';
import './BattlefieldPage.scss';



export function BattlefieldPage () {

  const { isEnemyShot } = useAppSelector(state => state.enemyField);
  const { field } = useAppSelector(state => state.playerField);
  const dispatch = useAppDispatch();


  useEffect(() => {
    let enableEnemyStrikes: NodeJS.Timeout;
    if (isEnemyShot) {
      enableEnemyStrikes = setInterval(() => {
        const targetCell = getNewEnemyShot(field);
        if (!targetCell) {
          return () => clearInterval(enableEnemyStrikes);
        }
        if (targetCell.status != 'ship') {
          dispatch(setIsEnemyShot(false));
        }
        dispatch(handleEnemyShot(targetCell));
      }, 50)
    }

    return () => clearInterval(enableEnemyStrikes);
  }, [isEnemyShot, field])


  return(
    <section className='battlefiled__page'>
      <PlayerShipList />
      <PlayerBattlefield size='calc(100vw / 4)' />
      <EnemyBattlefield />
      <EnemyShipList />
    </section>
  )
}