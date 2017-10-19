import React, { Component } from 'react';
import MediaQuery from 'react-responsive'
import Header from './components/header'
import Bookshelf from './components/bookshelf'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MediaQuery query="(min-device-width: 1224px)">
          <Header />
          </MediaQuery>
          <MediaQuery query="(max-device-width: 1224px)">
            <h3>Books:</h3>
          </MediaQuery>
          <div className="App-intro">
            <Bookshelf />
          </div>
      </div>
        );
  }
}

export default App;
