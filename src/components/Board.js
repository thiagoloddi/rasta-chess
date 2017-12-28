import React, { Component } from 'react';

import Row from './Row';
import chess from 'chess-rules';

export default class Board extends Component {

  renderBoard() {
    const board = [];
    if(this.props.flipped) {
      for(let i = 0; i < this.props.board.length; i += 8) {
        board.push(<Row selectedPiece={this.props.selectedPiece} tileClickAction={this.props.tileClickAction} flipped={this.props.flipped} firstIndex={i} board={this.props.board} />);
      }
    } else {
      for(let i = 64; i > 0; i -= 8) {
        board.push(<Row selectedPiece={this.props.selectedPiece} tileClickAction={this.props.tileClickAction} flipped={this.props.flipped} firstIndex={i - 8} board={this.props.board} />);
      }
    }

    return board;
  }

  render() {
    return (
      <div className='board'>{this.renderBoard()}</div>
    );
  }
}
