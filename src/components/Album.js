import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    //retrieve the album.slug object that matches
    //this.props.match.params.slug
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album
    };

  }

  render() {
    return(
      //the url will match /albums/slug. Provided by React Router.
      <section className="album">
      <section id="album-info">
        <img
        id="album-cover-art"
        src={ this.state.album.albumCover }
        alt={ this.state.album.title }
        />
        <div className="album-details">
          <h1 id="album-title">{ this.state.album.title }</h1>
          <h2 className="artist">{ this.state.album.artist }</h2>
          <div id="release-info">{ this.state.album.releaseInfo }</div>
        </div>
      </section>
      </section>
    );
  }
}

export default Album;
