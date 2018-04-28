import React from 'react';
import './List.css';

export const ListCard = ({ children }) => {
  return (
    <div className="listcard-overflow-container">
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};
