import React from 'react';
import { Router, Route, browserHistory, historyLocation } from 'react-router';

import Welcome from './containers/welcome';
import Simulation from './containers/simulation';
import Play from './containers/Play';

export default () => {

	return (
		<Router history={browserHistory}>
			<Route path="/" component={Welcome} />
			<Route path="/simulation" component={Simulation} />
			<Route path="/play" component={Play} />
		</Router>
	);
};
