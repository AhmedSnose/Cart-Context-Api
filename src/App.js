import './App.css';
import Nav from './components/Nav';
import {BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';


function App() {
  return (
   <Router>
    <Nav />

    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
    </Switch>

    <Switch>
      <Route path='/SignIn'>
        <SignIn />
      </Route>
    </Switch>

    <Switch>
      <Route path='/SignUp'>
        <SignUp />
      </Route>
    </Switch>

    <Switch>
      <Route path='/Cart'>
        <Cart />
      </Route>
    </Switch>

  </Router>
  );
}

export default App;

//  icons  material UI
// https://unpkg.com/browse/@heroicons/vue@1.0.5/outline/
// https://github.com/tailwindlabs/heroicons


