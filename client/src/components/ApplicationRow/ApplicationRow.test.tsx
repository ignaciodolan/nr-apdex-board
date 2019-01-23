import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationRow from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApplicationRow />, div);
  ReactDOM.unmountComponentAtNode(div);
});
