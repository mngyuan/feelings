import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import FeelingsInput, {getLastCompleteWord} from '../FeelingsInput';
import {MATCH} from '../Consts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('gets the last completed word', () => {
  const s1 = 'happy path testing is fun';
  expect(getLastCompleteWord(s1, {fun: true})).toEqual('fun');
  const emptyS = '';
  expect(getLastCompleteWord(emptyS, {})).toEqual(null);
  const obj1 = {};
  obj1[''] = true;
  expect(getLastCompleteWord(emptyS, obj1)).toEqual(null);
  const unfinishedWord = 'happy birthd';
  expect(getLastCompleteWord(unfinishedWord, {happy: true})).toEqual('happy');
});
