import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewItemForm from './components/NewItemForm';
import {Dialog, Button} from 'react-md';
import {openDialog, closeDialog} from './newItem.actions';
//import './NewItem.css';

class NewItem extends Component {

  render() {
    return (
      <div>
        <Button
          onClick={this.props.openDialog}
          floating
          secondary
          fixed
        >add
        </Button>
        <Dialog
          id="newItemDialog"
          className="newItem-dialog"
          aria-describedby="newItem"
          visible={this.props.isOpen}
          onHide={this.props.closeDialog}
          fullPage
        >
         <NewItemForm/>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.newItem.isOpen,
  };
}

export default connect(mapStateToProps, { openDialog, closeDialog })(NewItem);