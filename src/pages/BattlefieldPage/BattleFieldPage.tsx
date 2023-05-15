import { EnemyBattlefield, EnemyShipList, PlayerBattlefield, PlayerShipList } from '../../components';
import './BattlefieldPage.scss';



export function BattlefieldPage () {

  return(
    <section className='battlefiled__page'>
      <PlayerShipList />
      <PlayerBattlefield size='calc(100vw / 4)'/>
      <EnemyBattlefield />
      <EnemyShipList />
    </section>
  )
}