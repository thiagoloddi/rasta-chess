import express from 'express';
import path from 'path';
import routes from './routes';
import bodyParser from 'body-parser';

import MongoDB from '../api/db/MongoDB';

const app = express();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/chess';

app.set('mongoUrl', mongoUrl);

app.use('/', express.static('public'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const mongo = new MongoDB(app);
mongo.init();

routes(app, mongo);

const port = 8888;

app.listen(port, err => {
	if(err) console.log(err);
	else console.log(`Server online - Listening to port ${port}`);
});
