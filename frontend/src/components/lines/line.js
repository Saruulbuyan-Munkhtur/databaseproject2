import React from 'react';
import LineItem from './lineItem';
import './lines.css';

const Lines = ({ lines, sortOption, handleSortChange, handleLineSelect }) => {
  return (
    <div className="lines-page">
      <h1>Subway Lines</h1>
      <div className="sort-options">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          <option value="line_name">Line Number</option>
          <option value="mileage">Length</option>
        </select>
      </div>
      <div className="line-list">
        {lines.map((line) => (
		console.log("LINES: ", line.line_name),
          <LineItem key={line.line_name} line={line} onSelect={() => handleLineSelect(line)} />
        ))}
      </div>
    </div>
  );
};

export default Lines;