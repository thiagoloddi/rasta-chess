import axios from 'axios';

export default class GameReport {
  static create(summary, winner) {
    const toApi = [];

    for(let i in summary.moves) {
      const move = summary.moves[i];

      move.winner = winner;
      move.board = GameReport.createBoardState(move.board);
    }

    axios.post('/moves', summary.moves)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    console.log(summary);
  }

  static createBoardState(board) {
    let boardState = "";
    for(let i in board) {
      const piece = board[i];
      if(piece) {
        const l = piece.side == 'W' ? piece.type : piece.type.toLowerCase();
        boardState += l;
      } else {
        boardState += '0';
      }
    }

    return boardState;
  }
}
