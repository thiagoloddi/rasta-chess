import React, { Component } from 'react';
import chessRules from 'chess-rules';
import nodeChess from 'chess';
import GameReport from '../behaviors/GameReport';
import ComputerMoves from '../behaviors/ComputerMoves';


import { Button } from 'react-materialize';

import Board from '../components/Board';

const OPEN = 'OPEN';
const WHITEWON = 'WHITEWON';
const BLACKWON = 'BLACKWON';
const PAT = 'PAT';

export default class Play extends Component {

  constructor(props) {
    super(props);

    const playerSide = Math.random() > 0.5 ? 'W' : 'B';

    this.gameClient = nodeChess.create();

    this.state = {
      playerSide,
      flipped: playerSide == 'B',
      position: chessRules.getInitialPosition(),
      selectedPiece: null,
      status: null
    }

    this.summary = {
      moves: []
    };

    this.tileClickAction = this.tileClickAction.bind(this);
    this.computerPlay = this.computerPlay.bind(this);
  }


  componentDidMount() {
    if(this.state.playerSide == 'B') {
      this.computerPlay(this.state.position);
    }
  }

  async computerPlay(position) {
    const side = position.turn;
    const availablesMoves = chessRules.getAvailableMoves(position).map(mv => chessRules.moveToPgn(position, mv));
    ComputerMoves.getMove(availablesMoves, GameReport.createBoardState(position.board), side)
      .then(res => {

        // console.log(res.data);

        const move = chessRules.pgnToMove(position, res.data);

        // console.log(move);

        const newPosition = chessRules.applyMove(position, move);


        this.setState({ position: newPosition });
        this.updateSummary(move, chessRules.getGameStatus(newPosition), position);
      });
  }

  tileClickAction(index) {
    const { selectedPiece, position, playerSide } = this.state;

    const selectedSide = position.board[index] ? position.board[index].side : null;

    if(selectedPiece === null && selectedSide == playerSide) {
      this.setState({ selectedPiece: index });
    } else {
      const availableMoves = chessRules.getAvailableMoves(position);

      for(let i in availableMoves) {
        const move = availableMoves[i];
        if(move.src == selectedPiece && move.dst == index) {
          const newPosition = chessRules.applyMove(position, move);
          this.setState({ position: newPosition });

          const status = chessRules.getGameStatus(newPosition);
          this.updateSummary(move, status, position);

          if(status == OPEN) {
            this.computerPlay(newPosition);
          }

        }
      }
      this.setState({ selectedPiece: null });
    }
  }

  updateSummary(move, status, position) {
    console.log("summary:", move);

    const pgnMove = chessRules.moveToPgn(position, move);

    console.log("pgn:", pgnMove);
    const m = this.gameClient.move(pgnMove).move;
    const { isCheck, isCheckmate, isRepetition, isStalemate } = this.gameClient.getStatus();

    this.summary.moves.push({
      board: this.state.position.board,
      move: pgnMove,
      captured: m.capturedPiece ? (m.capturedPiece.notation ? m.capturedPiece.notation.toLowerCase() : "p") : null,
      isCheck, isCheckmate, isRepetition, isStalemate
    });

    if(status != OPEN) {
      this.setState({ status });

      let winner = "D";
      if(status == WHITEWON) winner = "W";
      if(status == BLACKWON) winner = "B";

      GameReport.create(this.summary, winner);
    }

  }

  renderEndGame() {
    if(this.state.status) {
      let msg = "Fim de jogo! ";
      switch(this.state.status) {
        case WHITEWON: msg += "Branco venceu."; break;
        case BLACKWON: msg += "Preto venceu."; break;
        case PAT: msg += "Empate."; break;
      }

      return <div>{msg}</div>;
    }
  }

  render() {
    return (
      <div className='play'>
        <Board selectedPiece={this.state.selectedPiece} tileClickAction={this.tileClickAction} flipped={this.state.flipped} board={this.state.position.board} />
        <Button waves='light'>Restart</Button>
        {this.renderEndGame()}
      </div>
    );
  }
}
