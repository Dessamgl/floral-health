import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewFloral } from "./pages/NewFloral";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext'
import { Floral } from './pages/Floral';
import { NewRecipe } from './pages/NewRecipe';
import { NewAnamnese } from './pages/NewAnamnese';
import { Historic } from './pages/Historic';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/floral" exact component={Floral} />
          <Route path="/floral/new" exact component={NewFloral} />
          <Route path="/floral/:id" exact component={NewFloral} />
          <Route path="/receita" exact component={NewRecipe} />
          <Route path="/receita/:id" exact component={NewRecipe} />
          <Route path="/anamnese" exact component={NewAnamnese} />
          <Route path="/anamnese/:id" exact component={NewAnamnese} />
          <Route path="/historico" exact component={Historic} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
