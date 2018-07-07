import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../components/pages/Map';

it('Renderiza sem crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Map />, div);
  ReactDOM.unmountComponentAtNode(div);
});
