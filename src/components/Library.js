import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../css/Library.css';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return(
      //call .map() on this.state.albums and return a <div> element that
      //prints the title property of each album.
      <section className="library">
        {
          /* First parameter: The album object. Second: The object's index */
          this.state.albums.map( (album, index) =>
            //Links to the album/album.slug. The slug is defined in albums.js
            <Link to={ `/album/${album.slug}` } key={ index }>
              <img  src={ album.albumCover } alt={ album.title } />
              <div className="album-info-contaier">
                <div>{ album.title }</div>
                <div>{ album.artist }</div>
                <div>{ album.songs.length } songs</div>
              </div>
            </Link>
         )
        }
      </section>
    );
  }
}

export default Library;
