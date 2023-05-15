import { Route, Routes } from 'react-router-dom';
import { BattlefieldPage, ShipArrangementPage } from './pages';


export function App() {
  return (
    <Routes>
      <Route path={'/'} element={ <ShipArrangementPage /> } />
      <Route path={'battle'} element={ <BattlefieldPage /> } />
    </Routes>
  );
}
