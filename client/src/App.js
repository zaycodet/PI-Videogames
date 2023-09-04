import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import DetailPage from './components/DetailPage/DetailPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/videogames" exact component={HomePage} />
        <Route path="/videogames/:id" exact component={DetailPage} />
        {/* Otras rutas aquí */}
      </Switch>
    </Router>
  );
}

export default App;
