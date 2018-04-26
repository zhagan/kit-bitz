import React, { Component } from 'react';

class KitDetailTable extends Component {
  render() {
    return (
      <div className="bom-table">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>MPN</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.inventory.map(item => {
                return (
                  <tr>
                    <td>{item.MPN}</td>
                    <td>{item.Qty}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default KitDetailTable;