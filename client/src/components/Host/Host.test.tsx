import React from 'react';
import ReactDOM from 'react-dom';
import Host from './Host';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Host />, div);
  ReactDOM.unmountComponentAtNode(div);
});
