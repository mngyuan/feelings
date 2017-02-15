import React, { Component } from 'react';
import './App.css';

const MATCH = /[\w']+|[.,!?;\-\n]/g;

// function constructPrefixTrie(transitions) {
//   if (!transitions) { return {}; }
//   const prefixTrie = {'\0': {}};
//   for (const key of Object.keys(transitions)) {
//     const record = (n, s) => {
//       if (s.length === 0) { return; }
//       if (!n[s[0]]) {
//         n[s[0]] = {count: 0};
//       }
//       n[s[0]].count += 1;
//       record(n[s[0]], s.slice(1));
//     };
//     record(prefixTrie, key + '$');
//   }
//   return prefixTrie;
// }

class FeelingsInput extends Component {
  constructor(props) {
    window.transitions = props.transitions;
    super(props);
    this.state = {
      text: '',
      predictedText: '',
      // basePrefixTrie: constructPrefixTrie(props.transitions),
    };
  }

  onChange = (e) => {
    if (e.target.value) {
      let [penultimate, lastWord] = e.target.value.match(MATCH).slice(-2);
      let lastFinishedWord = '\n';
      let currentUnfinishedWord = lastWord;
      let possibleWords = [];
      if (this.props.transitions[lastWord]) {
        // just finished typing a valid word, last two words are valid
        lastFinishedWord = lastWord;
        possibleWords = Object.entries(this.props.transitions[lastFinishedWord])
          .sort((a,b) => b[1].count - a[1].count)
          .map(entry => entry[0]);
      } else if (this.props.transitions[penultimate]) {
        // still typing a word, but the last one was valid
        lastFinishedWord = penultimate;
        currentUnfinishedWord = lastWord || ' ';
        possibleWords = this.getPossibleWord(currentUnfinishedWord, this.props.transitions[lastFinishedWord]);
      } else {
        // still typing a word and the previous one was invalid
        currentUnfinishedWord = lastWord || penultimate;
        possibleWords = this.getPossibleWord(currentUnfinishedWord, this.props.transitions);
      }

      const predictedText = e.target.value.slice(0, -currentUnfinishedWord.length) + possibleWords[0];
      this.setState({
        text: e.target.value,
        predictedText,
      });
      console.log('lastFinishedWord', lastFinishedWord, 'currentUnfinishedWord', currentUnfinishedWord, 'possibleWords', possibleWords, 'predictedText', predictedText);
    } else {
      this.setState({
        text: e.target.value,
      });
    }
  }

  getPossibleWord(s, transitions) {
    debugger;
    return Object.entries(transitions)
      // .filter(entry => s === ' ' || entry[0].indexOf(s) > -1)
      .filter(entry => s === ' ' || entry[0].startsWith(s))
      .sort((a,b) => b[1].count - a[1].count)
      .map(entry => entry[0]);
  }

  expand(prefixTrie) {

  }

  render() {
    return (
      <div className="feelingsInput">
        <textarea value={this.state.text} type="text" onChange={this.onChange}/>
        <div className="bgText">{this.state.predictedText}</div>
      </div>
    );
  }
}

export default FeelingsInput;
