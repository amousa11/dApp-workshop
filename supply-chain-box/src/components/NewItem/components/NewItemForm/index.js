import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { closeDialog, newItem } from '../../newItem.actions';
import ReduxedTextField from '../../../ReduxedTextField';
import { Button } from 'react-md';
import '../../NewItem.css';

class NewItemForm extends Component {

  submit(values) {
    console.log(values);
    this.props.newItem(values.name, values.price);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit.bind(this))}>
        <div className="md-grid">
          <div className="md-cell md-cell--12-desktop md-cell--10-tablet md-cell--10-phone text-center"><h1>Add New Item</h1></div>
          <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
          <div className="md-cell md-cell--8-desktop md-cell--6-tablet md-cell--6-phone">
          <h2>Item Name</h2>
          <Field
              id="name"
            name="name"
            type="text"
            label="Item Name"
            className="md-cell md-cell--8-desktop md-cell--10-tablet md-cell--10-phone"
            component={ReduxedTextField} 
            required/>
          </div>
          <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
          <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
          <div className="md-cell md-cell--8-desktop md-cell--6-tablet md-cell--6-phone">
            <h2>Price (Ether)</h2>
            <Field
              id="price"
              name="price"
              type="number"
              label="Item Price (Ether)"
              className="md-cell md-cell--8-desktop md-cell--10-tablet md-cell--10-phone"
              component={ReduxedTextField} 
              required />
          </div>
          <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
          <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
          <div className="md-cell md-cell--8-desktop md-cell--10-tablet md-cell--10-phone md-text-right login-cell">
            <Button raised secondary label="Cancel" onClick={this.props.closeDialog} className="margins" />
            <Button raised primary label="Submit" type="submit" className="margins" />
          </div>
          <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.newItem.isOpen,
  };
}

const connected = connect(mapStateToProps, { closeDialog, newItem })(NewItemForm);

const formedComponent = reduxForm({
  form: 'newItemForm', // a unique identifier for this form
})(connected);

export default formedComponent;