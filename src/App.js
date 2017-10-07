import React, { Component } from 'react';
import Header from './components/header'
import Books from './components/books'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-intro">
          <Books />
        </div>
      </div>
    );
  }
}

export default App;
