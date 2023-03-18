import React from 'react';
import ReactDOM from 'react-dom';
import ResultPage from './ResultPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});