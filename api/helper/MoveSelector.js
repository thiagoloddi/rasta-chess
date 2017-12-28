export default class MoveSelector {

  static select(allMoves, knownMoves, side) {
    const goodMoves = [];
    const newMoves = allMoves.map(mv => mv);

    for(let i in knownMoves) {
      const move = knownMoves[i];
      const total = move.B + move.W + move.D;
      let winPerc;
      if(side == 'W') {
        const winPerc = move.W / total;
      } else {
        const winPerc = move.B / total;
      }
      if(winPerc > 0.5) goodMoves.push(move.move);

      newMoves.splice(newMoves.indexOf(move.move), 1);
    }

    const eligibleMoves = goodMoves.concat(newMoves);

    if(eligibleMoves.length) {
      return MoveSelector.getRandomMove(eligibleMoves);
    } else {
      return MoveSelector.getRandomMove(allMoves);
    }

  }

  static getRandomMove(moves) {
    return moves[Math.floor(Math.random() * moves.length)];
  }
}
