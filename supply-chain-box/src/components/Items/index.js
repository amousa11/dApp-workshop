import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from '../Item';
import { openItem } from '../Item/item.actions';
import { fetchItems } from './items.actions';
import AmazonContract from '../../../build/contracts/Amazon.json';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Card, CardTitle } from 'react-md';

class Items extends Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    const rows =
      [<TableRow key={1} onClick={this.props.openItem}>
        <TableColumn>Spoon</TableColumn>
        <TableColumn><strong>1</strong></TableColumn>
        <TableColumn>10</TableColumn>
        <TableColumn>0x0</TableColumn>
      </TableRow>]


    return (
      <Card tableCard className="md-cell md-cell--12">
        <Item/>
        <CardTitle title="Items For Sale" />
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <TableColumn>Item Name</TableColumn>
              <TableColumn><strong>SKU</strong></TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Seller</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </DataTable>
      </Card>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.newItem.isOpen,
    web3: state.home.web3,
    contract: state.home.contract,
  };
}

export default connect(mapStateToProps, { openItem, fetchItems })(Items);