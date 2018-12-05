import React, { Component } from 'react';

class Album extends Component {
  render() {
    return(
      //the url will match /albums/slug. Provided by React Router. 
      <section className="album">
        <p>{ this.props.match.params.slug } Album will go here</p>
      </section>
    );
  }
}

export default Album;
