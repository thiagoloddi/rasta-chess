import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Play from '../containers/Play';

export default class PlayController {

	index(request, response) {

		const html = ReactDOMServer.renderToString(<Play />);
		const data = {
			html,
			seo: {
				title: 'Play',
				description: ''
			}
		};

		response.render('index', { data });

	}

}
