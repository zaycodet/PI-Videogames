import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/videogames" exact component={HomePage} />
        {/* Otras rutas aquí */}
      </Switch>
    </Router>
  );
}

export default App;
