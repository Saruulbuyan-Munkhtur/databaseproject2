import React, { useEffect, useState } from 'react';
import LineItem from '../components/lines/lineItem';
import { getLines } from '../services/lineService';
import './page.css';

const LinesPage = () => {
  const [lines, setLines] = useState([]);
  const [sortOption, setSortOption] = useState('line_name');

  useEffect(() => {
    fetchLines();
  }, []);

  const fetchLines = async () => {
    try {
      const data = await getLines();
      setLines(data);
    } catch (error) {
      console.error('Error fetching lines:', error);
    }
  };

  const handleLineSelect = (line) => {
    // Handle line selection, e.g., navigate to line details page
    console.log('Selected line:', line);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortLines = (lines) => {
	return lines.sort((a, b) => {
	  if (sortOption === 'line_name') {
	    const lineNumberA = parseInt(a.line_name.match(/\d+/)[0]);
	    const lineNumberB = parseInt(b.line_name.match(/\d+/)[0]);
	    return lineNumberA - lineNumberB;
	  } else if (sortOption === 'mileage') {
	    return a.mileage - b.mileage;
	  }
	  return 0;
	});
      };

  const sortedLines = sortLines(lines);

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
        {sortedLines.map((line) => (
          <LineItem key={line.line_name} line={line} onSelect={handleLineSelect} />
        ))}
      </div>
    </div>
  );
};

export default LinesPage;