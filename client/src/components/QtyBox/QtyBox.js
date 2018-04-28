import React from 'react';
import './QtyBox.css';

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const QtyBox = props => (
  <div className="qty-div">
    <label>
      <input className="qty-box" {...props}>
      </input>QTY
    </label>
  </div>
);

export default QtyBox;
