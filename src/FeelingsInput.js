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
      words: [],
    };
  }

  onChange = (e) => {
    const text = e.target.value;
    const words = text.match(MATCH);
    if (words
        && this.state.words
        && words.length === this.state.words.length
        && this.state.words.reduce((agg, cur, i) => agg && words[i] === cur)) {
      // Same words still
      this.setState({
        text,
        words,
      });
    } else {
      this.onWordsChange(text, words);
    }
  }

  onWordsChange = (text, words) => {
    const lastTypedWord = words ? words.slice(-1)[0] : '';
    const lastWord = getLastCompleteWord(text, this.props.transitions);
    let suggestion = '';
    let suggestionText = '';
    if (this.props.transitions[lastTypedWord]) {
      // happy birthday
      suggestion = pickWord(getPossibleWords('', this.props.transitions[lastWord]));
      suggestionText = `${text} ${suggestion}`;
    } else {
      // happy birthd
      suggestion = this.props.transitions[lastWord]
        ? pickWord(getPossibleWords(lastTypedWord, this.props.transitions[lastWord]))
        : null;
      suggestionText = suggestion
        ? `${text.slice(0, -lastTypedWord.length)}${suggestion}`
        : text;
    }
    console.log('lastTypedWord', lastTypedWord, 'lastWord', lastWord, 'suggestion', suggestion, 'suggestionText', suggestionText);
    this.setState({
      text,
      suggestionText,
      words,
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
    .sort((a,b) => b[1].count - a[1].count);
    // .map(entry => entry[0]);
}

export function pickWord(transitions) {
  let curRandom = Math.random();
  let total = 0;
  for (let [option, info] of transitions) {
    total += info.count;
  }
  for (let [option, info] of transitions) {
    curRandom -= info.count / total;
    if (curRandom < 0) {
      return option;
    }
  }
}
