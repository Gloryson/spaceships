import { useAppSelector } from '../../store/store';
import './PlayerShipList.scss';



export function PlayerShipList () {

  const { ships } = useAppSelector(state => state.playerField);

  return(
    <div className='player__ship__list'>
      <div className={'player__ship__list__flagship ' + (ships['flagship'] > 0 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__battleship ' + (ships['battleship'] > 0 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__battleship ' + (ships['battleship'] > 1 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__cruiser ' + (ships['cruiser'] > 0 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__cruiser ' + (ships['cruiser'] > 1 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__cruiser ' + (ships['cruiser'] > 2 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__destroyer ' + (ships['destroyer'] > 0 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__destroyer ' + (ships['destroyer'] > 1 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__destroyer ' + (ships['destroyer'] > 2 ? '' : 'destroyed')}></div>
      <div className={'player__ship__list__destroyer ' + (ships['destroyer'] > 3 ? '' : 'destroyed')}></div>
    </div>
  )
}