import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './../Library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: albumData
    };
  }
  render() {
    return (
      <section className='library'>
        <div className='top-bar'></div>
          <div className="album-list">
            {
              this.state.albums.map((album, index) =>
                <div className="container" key={index}>
                <div className="album">
                  <p className="artist">{album.artist}</p>
                  <img src={album.albumCover} alt={album.title} />
                  <p>{album.title}</p>
                  <Link to={`/album/${album.slug}`}>
                  <div className="listen">LISTEN</div>
                  </Link>
                  </div>
                </div>
              )
            }
          </div>
      </section>
    );
  }
}

export default Library;
