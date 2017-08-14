import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, Button } from 'react-md';
import { closeItem } from './item.actions';
//import './Item.css';

class Item extends Component {

    render() {
        return (
            <div>
                <Dialog
                    id="viewItemDialog"
                    className="Item-dialog"
                    aria-describedby="Item"
                    visible={this.props.isOpen}
                    onHide={this.props.closeItem}
                    fullPage
                >
                    <Button
                        onClick={this.props.changeState}
                        floating
                        secondary
                        fixed
                    >add
        </Button>
                    <div className="md-grid">
                        <div className="md-cell md-cell--12-desktop md-cell--10-tablet md-cell--10-phone text-center"><h1>{this.props.item || "Item"}</h1></div>
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--8-desktop md-cell--6-tablet md-cell--6-phone">
                            <h2>Item Name</h2>
                        </div>
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--8-desktop md-cell--6-tablet md-cell--6-phone">
                            <h2>SKU</h2>
                        </div>
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--8-desktop md-cell--6-tablet md-cell--6-phone">
                            <h2>Price (Ether)</h2>
                        </div>
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--8-desktop md-cell--6-tablet md-cell--6-phone">
                            <h2>Price (Ether)</h2>
                        </div>
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--8-desktop md-cell--6-tablet md-cell--6-phone">
                            <h2>Seller</h2>
                        </div>
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--8-desktop md-cell--6-tablet md-cell--6-phone">
                            <h2>Buyer</h2>
                        </div>
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                        <div className="md-cell md-cell--8-desktop md-cell--10-tablet md-cell--10-phone md-text-right login-cell">
                            <Button raised secondary label="Cancel" onClick={this.props.closeItem} className="margins" />
                            <Button raised primary label="Submit" type="submit" className="margins" />
                        </div>
                        <div className="md-cell md-cell--2-desktop md-cell--1-tablet md-cell--1-phone" />
                    </div>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isOpen: state.item.isOpen,
    };
}

export default connect(mapStateToProps, { closeItem })(Item);