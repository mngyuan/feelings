import React, { Component } from 'react';
import FeelingsInput from './FeelingsInput.js';
import output from '../pysrc/output.json';
import './App.css';

class App extends Component {
  render() {
    window.output = output;
    return (
      <div className="App">
        <FeelingsInput transitions={output}/>
      </div>
    );
  }
}

export default App;
