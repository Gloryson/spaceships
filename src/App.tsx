import { Route, Routes } from 'react-router-dom';
import { BattleResultPage, BattlefieldPage, ShipArrangementPage } from './pages';
import { useSound } from './hooks';


export function App() {

  useSound();

  return (
    <Routes>
      <Route path={'/'} element={ <ShipArrangementPage /> } />
      <Route path={'/battle'} element={ <BattlefieldPage /> } />
      <Route path={'/result'} element={ <BattleResultPage /> } />
    </Routes>
  );
}
