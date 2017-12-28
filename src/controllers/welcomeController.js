import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Welcome from '../containers/Welcome';

export default class WelcomeController {

	index(request, response) {

		const html = ReactDOMServer.renderToString(<Welcome />);
		const data = {
			html,
			seo: {
				title: 'New Project',
				description: ''
			}
		};

		response.render('index', { data });

	}

}
