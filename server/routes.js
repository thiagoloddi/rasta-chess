import WelcomeController from '../src/controllers/welcomeController';
import SimulationController from '../src/controllers/simulationController';
import PlayController from '../src/controllers/playController';
import MovesController from '../api/controllers/MovesController';

const routes = (app, mongo) => {

	app.get('/', new WelcomeController().index);
	app.get('/simulation', new SimulationController().index);
	app.get('/play', new PlayController().index);


	const moves = new MovesController(mongo);
	app.post('/moves', moves.post);
	app.get('/moves', moves.get);
};


export default routes;
