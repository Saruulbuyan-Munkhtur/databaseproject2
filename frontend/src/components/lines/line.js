import React, { useState } from 'react';
import LineItem from './lineItem';
import CreateLineForm from './createLineForm';
import './lines.css';

const Lines = ({ lines, sortOption, handleSortChange, handleLineSelect, handleCreateLine }) => {
  const [isCreateLinePopupOpen, setIsCreateLinePopupOpen] = useState(false);

  const handleCreateLineClick = () => {
    setIsCreateLinePopupOpen(true);
  };

  const handleCreateLineClose = () => {
    setIsCreateLinePopupOpen(false);
  };

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
          <LineItem key={line.line_name} line={line} onSelect={() => handleLineSelect(line)} />
        ))}
      </div>
      <button className="create-line-button" onClick={handleCreateLineClick}>
        Create Line
      </button>
      {isCreateLinePopupOpen && (
        <div className="create-line-popup">
          <div className="create-line-popup-content">
            <h2>Create New Line</h2>
            <CreateLineForm onSubmit={handleCreateLine} onClose={handleCreateLineClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Lines;