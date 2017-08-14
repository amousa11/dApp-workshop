import React, { Component } from 'react';
import Items from "../Items/index";
import NewItem from '../NewItem/index';
import {connect} from 'react-redux';
import {instantiateContract, injectWeb3} from './home.actions';

class Home extends Component {

  componentWillMount() {
    this.props.instantiateContract();
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
    contract: state.home.contract
  };
}

export default connect(mapStateToProps, { instantiateContract, injectWeb3 })(Home);