import { Route, Routes } from 'react-router-dom';
import { BattleResultPage, BattlefieldPage, ShipArrangementPage } from './pages';


export function App() {
  return (
    <Routes>
      <Route path={'/'} element={ <ShipArrangementPage /> } />
      <Route path={'/battle'} element={ <BattlefieldPage /> } />
      <Route path={'/result'} element={ <BattleResultPage /> } />
    </Routes>
  );
}
