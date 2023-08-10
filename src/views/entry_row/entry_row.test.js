import React from 'react';
import ReactDOM from 'react-dom';
import EntryRow from './EntryRow';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EntryRow />, div);
  ReactDOM.unmountComponentAtNode(div);
});