import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Pokemons from './pages/Pokemons';
import PokemonDetail from './pages/PokemonDetail';
import Settings from './pages/Settings';

const App = () => {
  const {theme} = useSelector(state => state);

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokemons />} />
          <Route path="/pokedex/:idOrName" element={<PokemonDetail />} />
        </Route>        
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;