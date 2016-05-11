/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';

import Home from 'app/shared/components/Home';

const data = window.__DATA__.map(d => ({...d, date: new Date(d.date)}));

ReactDOM.render((
  <Home
    data={data}
  />
), document.getElementById('app'));
