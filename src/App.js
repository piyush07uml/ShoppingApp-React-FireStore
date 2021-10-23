import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import './App.css';
import Home from './Components/Home';
import CartList from './Components/CartList';
import AppNavbar from './Components/AppNavbar';
import Billing from './Components/Billing';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App" >
            <AppNavbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cartList" component={CartList} />
              <Route exact path="/billing" component={Billing} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
