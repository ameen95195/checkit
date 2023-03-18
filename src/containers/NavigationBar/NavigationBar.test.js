import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import NavigationBar from './NavigationBar';

it('It should mount', () => {
  const div = document.createElement('div');
  const root = ReactDOMClient.createRoot(div)
  root.render(<NavigationBar />);
  root.unmount();
});