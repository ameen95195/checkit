import React from 'react';
import ReactDOM from 'react-dom';
import AddMaterial from './AddMaterial';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddMaterial />, div);
  ReactDOM.unmountComponentAtNode(div);
});