import React, { useState } from 'react';
import { getShortestPath, getShortestPathWithBus } from '../../services/graphService';
import StationItem from '../stations/stationItem';
import './graph.css';

const ShortestPath = () => {
  const [startNodeName, setStartNodeName] = useState('');
  const [endNodeName, setEndNodeName] = useState('');
  const [shortestPath, setShortestPath] = useState([]);
  const [shortestPath2, setShortestPath2] = useState([]);
  const [bus, setBus] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBus('');
      const path = await getShortestPath(startNodeName, endNodeName);
      setShortestPath(path);

      if (path.length == 1) {
        let path3 = [];
        const path2 = await getShortestPathWithBus(startNodeName, endNodeName);
        setBus(path2[1][path2[1].length - 1]);
        for (let i = 0; i < path2[0].length - 1; i++) {
            const startNode = path2[0][i].name.toString();
            const endNode = path2[0][i + 1].name.toString();
    
            const hasPath = await getShortestPath(startNode, endNode);
            if (hasPath.length > 1) {
                path3 = hasPath;
            }
        }

        path3.push(endNodeName);
        if(bus && path.length == 1){
          setShortestPath([]);
        } else{
          setShortestPath(path3);
        }
    }
    } catch (error) {
      console.error('Error fetching shortest path:', error);
    }
  };

  return (
    <div className="shortest-path">
      <h2>Shortest Path</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Start Node"
          value={startNodeName}
          onChange={(e) => setStartNodeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Node"
          value={endNodeName}
          onChange={(e) => setEndNodeName(e.target.value)}
        />
        <button type="submit">Find Shortest Path</button>
      </form>
      {shortestPath.length > 1 && (
    <div className="shortest-path-result">
        <h3>Shortest Path:</h3>
        <div className="path-container">
            {shortestPath.map((item, index) => (
                <React.Fragment key={index}>
                    <StationItem stationName={item} />
                    {index < shortestPath.length - 1 && (
                        <div className="arrow">&#8594;</div>
                    )}
                    {index === shortestPath.length - 2 && bus !== '' && (
                        <React.Fragment>
                            <div className='bus-info-container'>
                                <div className="bus-info">Take {bus}</div>
                            </div>
                            <div className="arrow">&#8594;</div>
                        </React.Fragment>
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
)}




    </div>
  );
};

export default ShortestPath;