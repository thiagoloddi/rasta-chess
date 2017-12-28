import axios from 'axios';

export default class ComputerMoves {

  static async getMove(moves, board, side) {
    const query = `?moves=${JSON.stringify(moves)}&board=${board}&side=${side}`;
    return axios.get(`/moves${query}`);
  }
}
