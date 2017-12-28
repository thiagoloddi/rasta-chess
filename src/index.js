import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Routes from './routes';

const reducer = (state = {}) => {
	return state;
};

const store = createStore(reducer);

ReactDom.render(
	<Provider store={store}>
  		{ Routes() }
  	</Provider>,
	document.querySelector('[app-container]')
);