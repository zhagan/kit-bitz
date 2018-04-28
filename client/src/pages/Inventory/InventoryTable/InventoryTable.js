import React, { Component } from 'react';

class InventoryTable extends Component {
  render() {
    return (
      <div className="inventory-table">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Qty</th>
              <th>MPN</th>
              <th>Snippet</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.inventory.map(item => {
                return (
                  <tr>
                    <td>
                      <input type="number" className="form-control text-center"
                        defaultValue={item.Qty}
                        onChange={this.props.handleQtyInputChange}
                        data-part-id={item.MPN}
                      />
                    </td>
                    <td>{item.MPN}</td>
                    <td>{item.Snippet}</td>
                    <td><button onClick={(e) => this.props.handleDeletePart(item.MPN)} className="btn btn-danger btn-sm">✘</button></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default InventoryTable;