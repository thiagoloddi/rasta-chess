import React, { Component } from 'react';
import Tile from './Tile';

export default class Row extends Component {

  renderTiles() {
    const tiles = [];
    const { firstIndex, flipped } = this.props;

    let first = flipped ? firstIndex + 7 : firstIndex;
    let last = flipped ? firstIndex - 1 : firstIndex + 8;
    let diff = flipped ? -1 : 1;


    for(let i = first; i != last; i += diff) {
      const row = Math.floor(i / 8);
      const column = i % 8;
      let color;
      if((row % 2 == 0 && column % 2 == 0) || (row % 2 == 1 && column % 2 == 1)) {
        color = 'white';
      } else {
        color = 'black';
      }

      tiles.push(<Tile selected={this.props.selectedPiece == i} tileClickAction={this.props.tileClickAction} index={i} piece={this.props.board[i]} color={color}/>);
    }

    return tiles;
  }

  render() {
    return (
      <div className='chess-row'>
        {this.renderTiles()}
      </div>
    )
  }
}
