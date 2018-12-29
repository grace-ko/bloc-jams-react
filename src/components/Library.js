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
          {
            this.state.albums.map((album, index) =>
              <div className="container" key={index}>
                <img src={album.albumCover} alt={album.title} />
                <p>{album.title} - {album.artist}</p>
                <Link to={`/album/${album.slug}`}>
                <div className="icon"><ion-icon name="arrow-dropright-circle"></ion-icon></div>
                </Link>
              </div>
            )
          }
      </section>
    );
  }
}

export default Library;
