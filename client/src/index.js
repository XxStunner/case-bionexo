import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/pages/Map';
import registerServiceWorker from './registerServiceWorker';
import "./assets/sass/styles.scss";

ReactDOM.render(<Map />, document.getElementById('root'));
registerServiceWorker();
