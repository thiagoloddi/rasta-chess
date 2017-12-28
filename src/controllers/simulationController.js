import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Simulation from '../containers/Simulation';

export default class SimulationController {

	index(request, response) {

		const html = ReactDOMServer.renderToString(<Simulation />);
		const data = {
			html,
			seo: {
				title: 'Simulation',
				description: ''
			}
		};

		response.render('index', { data });

	}

}
