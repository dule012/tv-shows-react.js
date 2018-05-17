import React, { Component } from 'react';
import '../App.css';
import Footer from './partials/Footer.js'
import {Switch,Route} from 'react-router-dom'
import ShowPage from './showPage/ShowPage'
import InfoPage from './infoPage/InfoPage'

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Switch>
        <Route exact path='/InfoPage/:id' component={InfoPage} />
        <Route exact path='/' component={ShowPage} />
        </Switch>
      <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
