import React, { Component } from 'react';
import chess from 'chess-rules';
import { Button } from 'react-materialize';

import Board from '../components/Board';

const TIMEOUT = 1000;

export default class Simulation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flipped: false,
      stopped: true,
      position: chess.getInitialPosition()
    }

    this.toggleStart = this.toggleStart.bind(this);
    this.computerPlay = this.computerPlay.bind(this);
  }

  render() {

    return (
      <div className="simulation">
        <Board flipped={this.state.flipped} board={this.state.position.board}/>
        <Button waves='light' onClick={() => this.setState({ flipped: !this.state.flipped })}>Flip Board</Button>
        <Button waves='light' onClick={this.toggleStart}>{this.state.stopped ? "Start" : "Stop"}</Button>
      </div>
    );
  }

  computerPlay() {
    if(!this.state.stopped) {
      const { position } = this.state;
      const availablesMoves = chess.getAvailableMoves(position);
      const move = availablesMoves[Math.floor(Math.random() * availablesMoves.length)];
      const newPosition = chess.applyMove(position, move);
      this.setState({ position: newPosition });

      this.timeout = setTimeout(this.computerPlay, TIMEOUT);
    }
  }

  toggleStart() {
    if(this.state.stopped) {
      this.timeout = setTimeout(this.computerPlay, TIMEOUT);
    }
    else if(this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState({ stopped: !this.state.stopped });
  }
}
