import React, { Component } from 'react';
import Items from "../Items/index";
import NewItem from '../NewItem/index';
import { connect } from 'react-redux';
import { injectWeb3 } from './home.actions';

class Home extends Component {

  componentDidMount() {
    this.props.injectWeb3();
  }

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

function mapStateToProps(state, ownProps) {
  return {
    web3: state.home.web3
  };
}

export default connect(mapStateToProps, { injectWeb3 })(Home);