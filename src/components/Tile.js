import React, { Component } from 'react';

export default class Tile extends Component {

  render() {
    const style = {};
    if(this.props.piece) {
      style['backgroundImage'] = `url(/assets/icons/${this.props.piece.side}${this.props.piece.type}.png)`
    };

    return (
      <div onClick={() => this.props.tileClickAction(this.props.index)} style={style} className={`chess-tile -${this.props.color}`}>
        {this.props.selected ? <div className='selected-filter'></div> : null}
      </div>
    );
  }
}
