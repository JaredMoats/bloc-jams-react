import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    //retrieve the album.slug object that matches
    //this.props.match.params.slug
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      /* Ensures we're accessing the album that matches the slug
      (figured out above) */
      album: album,
      /* Keeps track of the song currently being manipulated.
      By default, set to the first song in the album. */
      currentSong: album.songs[0],
      /* Keeps track of if a song is playing */
      isPlaying: false,
      /* Keeps track of if a song is being hovered over */
      isHovering: null
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    console.log(`From constructor: The object in isPlaying is ${this.state.isPlaying}`);

    console.log(`From constructor: The length of this.state.album.songs is: ${this.state.album.songs.length}`);
  } //end of constructor

  /* Plays the song */
  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  /* Pauses the song */
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  /* Sets the selected song to the one that's been clicked.
  This function is called in handleSongClick() */
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  /* Plays or pauses the clicked song. The parameter
  is passed to this function from .map() in the class's
  render() method. Same is true for all other functions.*/
  handleSongClick(song) {

    console.log("Song parameter from handleSongClick(): " + song.title);
    //If the current song matches the song parameter, isSameSong equals true.
    const isSameSong = this.state.currentSong === song;

    //if isPlaying and isSameSong are the same, then pause it (calls the pause function)
    if(this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if(!isSameSong) { this.setSong(song) }
      this.play();
    }
  }

  handlePrevClick() {
    /* Find the index of the current song */
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    /* Calculate new index by subtracting 1
    (Math.max returns the great value of the given parameters.)*/
    const newIndex = Math.max(0, currentIndex - 1);
    /* Set a newSong variable to the index of the newIndex */
    const newSong = this.state.album.songs[newIndex];
    /* Set the new song */
    this.setSong(newSong);
    /* Play the new song */
    this.play();
  }

  handleNextClick() {
    /* 1. Find the index of the current song */
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    /* 2. Calculate the new index.  */
    let newIndex = currentIndex + 1;
    /* 2A. If the new index is greater than the
     index of the last song (this.state.album.songs.length - 1),
     then the index remains the same */
    if(newIndex > this.state.album.songs.length - 1) {
      newIndex = currentIndex;
    }
   /*3.  Set the newSong variable to the index of the newIndex*/
   const newSong = this.state.album.songs[newIndex];
   /* 4. Set the new song */
   this.setSong(newSong);
   /* 5. Play the new song */
   this.play();
  }

  handleMouseEnter(index) {
    console.log(`You hovered over song (index): ${index}`);

    this.setState({ isHovering: index });

    console.log(`From handleMouseEnter: The value of isHovering is: ${this.state.isHovering}`);
}

  handleMouseLeave(index) {
    console.log( `Your stopped hovering over song (index): ${index}`);
    this.setState({ isHovering: null });
    console.log(`From handleMouseLeave: The state of isHovering is ${this.state.isHovering}`);
  }

 /* Handles whether to display play or pause icons, or the song's number */
  playOrPauseIcon(song, index) {
    //If the current song matches the song parameter, isSameSong equals true.
    const isSameSong = this.state.currentSong === song;

    //Display the pause icon if isSameSong is true and isPlaying is true.
    if(isSameSong && this.state.isPlaying){
      return(
        <td><button><span className="icon ion-md-pause"></span></button></td>
      );
    } else if(isSameSong && !this.state.isPlaying) {
      return(
        <td><button><span className="icon ion-md-play"></span></button></td>
      );
    } else if(this.state.isHovering === index){
      return(
        <td><button><span className="icon ion-md-play"></span></button></td>
      );
    } else {
      return(
        <td>{ index + 1 }</td>
      );
    }
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
              /* Accessing the songs object (song details nested within it)
              in ./../data/albums.js. Since we know we're accessing the songs
              object, the first parameter of map is the song details (title, duration,
              etc.) The second parameter is the index.*/
              this.state.album.songs.map( (song, index) =>
                <tr
                className="song"
                key={ index }
                onClick={ () => this.handleSongClick(song) }
                onMouseEnter={ () => this.handleMouseEnter(index) }
                onMouseLeave={ () => this.handleMouseLeave(index) }
                >
                  { this.playOrPauseIcon(song, index) }
                  <td>{ song.title }</td>
                  <td>{ song.duration } seconds</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={ this.state.isPlaying }
          currentSong={ this.state.currentSong }
          handleSongClick={ () => this.handleSongClick(this.state.currentSong) }
          handlePrevClick={ () => this.handlePrevClick() }
          handleNextClick={ () => this.handleNextClick() }
        />
      </section>
    );
  }
}
export default Album;
