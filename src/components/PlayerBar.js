import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <i class="icon ion-md-skip-backward custom-icon"></i>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick}>
            <i class={this.props.isPlaying ? 'icon ion-md-pause custom-icon' : 'icon ion-md-play custom-icon'}></i>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <i class="icon ion-md-skip-forward custom-icon"></i>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">{this.props.formattedCurrentTime(this.props.currentTime)}</div>
          <ion-icon name="rewind"></ion-icon>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <ion-icon name="fastforward"></ion-icon>
        </section>
        <section id="volume-control">
          <div className="total-time">{this.props.formattedDuration(this.props.duration)}</div>
          <ion-icon name="volume-low"></ion-icon>
          <input
            type="range"
            className="seek-bar"
            value={this.props.volume || 0}
            min="0"
            max="1"
            step="0.01"
            onChange={this.props.handleVolumeChange}
          />
          <ion-icon name="volume-high"></ion-icon>
        </section>
      </section>
    );
  }
}


export default PlayerBar;
