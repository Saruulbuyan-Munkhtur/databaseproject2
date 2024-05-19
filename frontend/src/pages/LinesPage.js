import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Lines from '../components/lines/line';
import LineDetail from '../components/lines/lineDetail';
import { getLines } from '../services/lineService';

const LinesPage = () => {
  const [lines, setLines] = useState([]);
  const [sortOption, setSortOption] = useState('line_name');
  const navigate = useNavigate();

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
    navigate(`/lines/${encodeURIComponent(line.line_name)}`, { state: { lineName: line.line_name } });
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
    <Routes>
      <Route
        path="/"
        element={
          <Lines
            lines={sortedLines}
            sortOption={sortOption}
            handleSortChange={handleSortChange}
            handleLineSelect={handleLineSelect}
          />
        }
      />
      <Route path="/*" element={<LineDetail />} />
    </Routes>
  );
};

export default LinesPage;