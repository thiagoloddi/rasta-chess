import mongo from '../db/MongoDB';
import MoveSelector from '../helper/MoveSelector';

export default class MovesController {

  constructor(mongo) {
    this.mongo = mongo;

    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
  }

  post(req, res) {
    for(let i in req.body) {
      const move = req.body[i];

      const update = { "$inc": {} };
      update["$inc"][move.winner] = 1;


      this.mongo.Moves.findOneAndUpdate({ move: move.move, board: move.board }, update, { upsert: true, setDefaultsOnInsert: true });
    }

    res.send(200);
  }

  async get(req, res) {
    const { board, side } = req.query;
    const moves = JSON.parse(req.query.moves);
    const knownMoves = await this.mongo.Moves.find({ board, move: { '$in': moves }});
    const move = MoveSelector.select(moves, knownMoves, side);

    console.log("move:", move);


    res.send(move);

  }

}
