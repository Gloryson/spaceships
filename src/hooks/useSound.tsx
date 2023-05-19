import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { finishEnemySound } from '../store/playerFieldSlice';
import { finishPlayerSound } from '../store/enemyFieldSlice';
import playerShotPath from '../assets/sounds/player-shot.mp3';
import enemyShotPath from '../assets/sounds/enemy-shot.mp3';
import explosionSoundPath from '../assets/sounds/explosion.mp3';


export function useSound () {

  const playerShot = useMemo(() => new Audio(playerShotPath), []);
  const enemyShot = useMemo(() => new Audio(enemyShotPath), []);
  const explosion = useMemo(() => new Audio(explosionSoundPath), []);
  const { playerShotSound, playerExplosionSound } = useAppSelector(state => state.enemyField);
  const { enemyShotSound, enemyExplosionSound } = useAppSelector(state => state.playerField);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (playerShotSound) {
      playerShot.pause();
      playerShot.currentTime = 0.0;
      playerShot.play();
    }
    if (enemyShotSound) {
      enemyShot.pause();
      enemyShot.currentTime = 0.0;
      enemyShot.play();
    }
    if (playerExplosionSound || enemyExplosionSound) {
      explosion.pause();
      explosion.currentTime = 0.0;
      explosion.play();
    }
    dispatch(finishEnemySound());
    dispatch(finishPlayerSound());
  }, [playerShotSound, playerExplosionSound, enemyShotSound, enemyExplosionSound])


}