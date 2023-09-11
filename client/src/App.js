import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import DetailPage from './components/DetailPage/DetailPage';
import FormPage from './components/FormPage/FormPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/videogames" exact component={HomePage} />
        <Route path="/videogames/:id" exact component={DetailPage} />
        <Route path="/form" exact component={FormPage} />
        {/* Otras rutas aquí */}
      </Switch>
    </Router>
  );
}

export default App;
