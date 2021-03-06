import React from 'react';
import './Form.css';

export const FormBtn = props => (
  <button {...props} className="btn btn-success" id="form-btn">
    {props.children}
  </button>
);
