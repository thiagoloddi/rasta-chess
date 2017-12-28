import mongoose from 'mongoose';
import move from './schemas/move_schema';

export default class MongoDB {
	constructor(app) {
		this.app = app;
	}

	init() {
		const env = this.app.get('env');
		const Schema = mongoose.Schema;
		const db = mongoose.createConnection(this.app.get('mongoUrl'));
		mongoose.set('debug', true);

		console.log("MONGO: Connected to " + env + " - " + this.app.get('mongoUrl'));

		this.Moves = db.model('moves', move(Schema));

	}
}
