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
      album: album,
      currentSong: album.songs[0],
      hoverSong: album.songs[0],
      isPlaying: false
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
    console.log("Song being passed to set song: " + song.title);
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {

    console.log("Song parameter from handleSongClick(): " + song.title);
    const isSameSong = this.state.currentSong === song;

    //if isPlaying and isSameSong are the same, then pause it (calls the pause function)
    if(this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if(!isSameSong) { this.setSong(song) }
      this.play();
    }
  }


  pauseIconPlayingSong(song) {
    if(this.state.isPlaying === true) {
      console.log("From pauseIconPlayingsong(): The song is playing!");
    }
  }

  playIcon(song) {
    const isSameSong = this.state.currentSong === song;

    console.log("The value of isSameSong is: " + isSameSong);
  }

  normalDisplay() {
    console.log("normalDisplay() triggered");
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
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr
                className="song"
                key={ index }
                onMouseEnter={ () => this.playIcon(song) }
                onClick={ () => this.handleSongClick(song) }
                onChange={ () => this.pauseIconPlayingSong(song) }
                >
                  <td onClick={ () => this.pauseIconPlayingSong(song) }>{ index + 1 }</td>
                  <td>{ song.title }</td>
                  <td>{ song.duration } seconds</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}
export default Album;
