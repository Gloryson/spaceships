import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getNewEnemyShot } from '../helpers/getNewEnemyShot';
import { setIsEnemyShot } from '../store/enemyFieldSlice';
import { handleEnemyShot } from '../store/playerFieldSlice';
import { useNavigate } from 'react-router-dom';



export function useBot () {

  const { field, isEditField, isPlayerVictory } = useAppSelector(state => state.playerField);
  const { isEnemyShot, isEnemyVictory } = useAppSelector(state => state.enemyField);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isPlayerVictory || !isEnemyVictory) {
      navigate('/result');
    }
    if (isEditField) {
      navigate('/');
    }

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
      }, 1000)
    }

    return () => clearInterval(enableEnemyStrikes);
  }, [isEnemyShot, field, isEditField, isPlayerVictory, isEnemyVictory]);

}