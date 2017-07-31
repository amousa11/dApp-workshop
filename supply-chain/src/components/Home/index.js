import React, { Component } from 'react';
import Items from "../Items/index";
import NewItem from '../NewItem/index';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="md-grid">
          <Items/>
        </div>
        <NewItem />
      </div>
    );
  }
}

export default Home;