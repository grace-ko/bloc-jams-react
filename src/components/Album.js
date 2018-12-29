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
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      hovered: null,
      volume: 0
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = 0;
  }
  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }
  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
      this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }
  componentWillUnmounnt() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  handleVolumeChange(e) {
    this.audioElement.volume = e.target.value;
    this.setState({ volume: e.target.value });
  }
  mouseOver(index) {
    this.setState({ hovered: index });
  }

  mouseLeave(index) {
    this.setState({ hovered: null });
  }
  formatTime(seconds) {
    if(typeof(parseInt(seconds)) !== 'number') {
      return '-:--'
    }
    let minute = Math.floor(seconds / 60);
    let second = Math.floor(seconds % 60);
    if (second < 10) {
      second = `0${second}`
    }
    return `${minute}:${second}`;
  }
  button(index) {
    if(!this.state.isPlaying && this.state.hovered === index) {
      return <ion-icon name="arrow-dropright-circle"></ion-icon>;
    } else if (this.state.isPlaying && this.state.hovered === index) {
      return <ion-icon name="pause"></ion-icon>;
    }
    return index + 1;
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
                <td>{this.formatTime(song.duration)}</td>
              </tr>
            )
          }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formattedCurrentTime={() => this.formatTime(this.state.currentTime)}
          formattedDuration={() => this.formatTime(this.state.duration)}
        />
      </section>
    );
  }
}


export default Album;
