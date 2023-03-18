import React from 'react';
import ReactDOM from 'react-dom';
import AddQuestion from './AddQuestion';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddQuestion />, div);
  ReactDOM.unmountComponentAtNode(div);
});