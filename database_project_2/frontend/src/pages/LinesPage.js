import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Lines from '../components/lines/line';
import LineDetail from '../components/lines/lineDetail';
import { getLines, createLine } from '../services/lineService';

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
  const handleDeleteLine = () => {
    fetchLines(); // Refresh the lines data after deletion
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

  const handleCreateLine = async (formData) => {
    try {
      const { lineName, intro, mileage, color, first_opening, url, start, end } = formData;
      const newLine = await createLine(lineName, intro, mileage, color, first_opening, url, start, end);
      console.log(newLine);
      fetchLines();
    } catch (error) {
      alert('No administration!')
      console.error('Error creating line:', error);
    }
  };

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
            handleCreateLine={handleCreateLine}
          />
        }
      />
      <Route path="/*" element={<LineDetail onDelete={handleDeleteLine} />} />
    </Routes>
  );
};

export default LinesPage;