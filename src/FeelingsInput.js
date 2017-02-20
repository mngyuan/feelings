import React, { Component } from 'react';
import {MATCH} from './Consts.js';
import './App.css';

class FeelingsInput extends Component {
  constructor(props) {
    window.transitions = props.transitions;
    super(props);
    this.state = {
      text: '',
      suggestionText: '',
    };
  }

  onChange = (e) => {
    const text = e.target.value;
    const words = text.match(MATCH);
    const lastTypedWord = words.slice(-1)[0];
    const lastWord = getLastCompleteWord(text, this.props.transitions);
    let suggestion = '';
    let suggestionText = '';
    if (this.props.transitions[lastTypedWord]) {
      // happy birthday
      suggestion = getPossibleWords('', this.props.transitions[lastWord])[0];
      suggestionText = `${text} ${suggestion}`;
    } else {
      // happy birthd
      suggestion = getPossibleWords(lastTypedWord, this.props.transitions[lastWord])[0];
      suggestionText = `${text.slice(0, -lastTypedWord.length)}${suggestion}`;
    }
    console.log('lastTypedWord', lastTypedWord, 'lastWord', lastWord, 'suggestion', suggestion, 'suggestionText', suggestionText);
    this.setState({
      text,
      suggestionText,
    });
  }

  render() {
    return (
      <div className="feelingsInput">
        <textarea value={this.state.text} type="text" onChange={this.onChange}/>
        <div className="bgText">{this.state.suggestionText}</div>
      </div>
    );
  }
}

export default FeelingsInput;

export function getLastCompleteWord(text, validWords) {
  const words = text.match(MATCH);
  if (!words) { return null; }
  const lastWord = words.slice(-1)[0];
  const penultimateWord = words.slice(-2)[0];
  if (validWords[lastWord]) {
    return lastWord;
  } else {
    if (validWords[penultimateWord]) {
      return penultimateWord;
    }
    return null;
  }
}

export function getPossibleWords(s, transitions) {
  return Object.entries(transitions)
    // .filter(entry => s === ' ' || entry[0].indexOf(s) > -1)
    .filter(entry => s === ' ' || entry[0].startsWith(s))
    .sort((a,b) => b[1].count - a[1].count)
    .map(entry => entry[0]);
}
