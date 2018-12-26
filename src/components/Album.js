import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });
    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      hovered: album.songs.map(index => {
        return false })
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }
  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if(!isSameSong) {
        this.setSong(song);
      }
        this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  mouseOver(index) {
    let newState = [...this.state.hovered];
    newState[index] = true;
    this.setState({ hovered: newState });
  }

  mouseLeave(index) {
    let newState = [...this.state.hovered];
    newState[index] = false;
    this.setState({ hovered: newState });
  }

  button(index) {
    let button = index + 1;
    if(!this.state.isPlaying && this.state.hovered[index]) {
      button = <ion-icon name="arrow-dropright-circle"></ion-icon>;
    } else if (this.state.isPlaying && this.state.hovered[index]) {
      button = <ion-icon name="pause"></ion-icon>;
    }
    return <span>{button}</span>
  }

  render() {
    return(
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-colum" />
            <col id="song-title-colum" />
            <col id="song-duration-colum" />
          </colgroup>
          <tbody>

          {
            this.state.album.songs.map((song, index) =>
              <tr key={index} className="song" onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.mouseOver(index)} onMouseLeave={() => this.mouseLeave(index)}>
                <td>{this.button(index)}</td>
                <td>{song.title}</td>
                <td>{(song.duration/60).toFixed(1)}minutes</td>
              </tr>
            )
          }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
        />
      </section>
    );
  }
}


export default Album;
