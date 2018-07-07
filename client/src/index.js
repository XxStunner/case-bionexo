import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/pages/Map';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Map />, document.getElementById('root'));
registerServiceWorker();
