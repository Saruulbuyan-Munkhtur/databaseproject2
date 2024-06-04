import React, { useState } from 'react';
import { getShortestPath, getShortestPathWithBus } from '../../services/graphService';
import StationItem from '../stations/stationItem';
import './graph.css';

const ShortestPath = () => {
  const [startNodeName, setStartNodeName] = useState('');
  const [endNodeName, setEndNodeName] = useState('');
  const [shortestPath, setShortestPath] = useState([]);
  const [bus, setBus] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBus('');
      let buses = [];
      const path = await getShortestPath(startNodeName, endNodeName);
      setShortestPath(path);

      if (path.length == 1) {
        let path3 = [];
        const path2 = await getShortestPathWithBus(startNodeName, endNodeName);
        setBus(path2[1][path2[1].length - 1]);
        for (let i = 0; i < path2[0].length -1 ; i++) {
            const startNode = path2[0][i].name.toString();
            const endNode = path2[0][i + 1].name.toString();
    
            const hasPath = await getShortestPath(startNode, endNode);
            console.log(hasPath)
            if (hasPath.length > 1) {
              for(let i = 0; i < hasPath.length-1; i++){
                buses.push('redundant');
              }
              path3 = path3.concat(hasPath.filter(node => !path3.includes(node)));
            } else{
              buses.push(path2[1][i]);
              path3 = path3.concat(hasPath.filter(node => !path3.includes(node)));
            }
          }
        setBus(buses);
        setNumBus(buses.length);
        setShortestPath(path3);
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
                {index == shortestPath.length -1 && bus[index] == 'redundant' && (
                  <React.Fragment>
                      <div className='bus-info-container'>
                      <StationItem stationName={item} />
                    </div>
                  </React.Fragment>
                )}
                { bus[index] !== 'redundant' && index == shortestPath.length -1 && (
                  <React.Fragment>
                      <div className='bus-info-container'>
                      <StationItem stationName={item} />
                    </div>
                  </React.Fragment>
                )}
                {bus[index] == 'redundant' && index < shortestPath.length - 1 &&(
                  <React.Fragment>
                  <StationItem stationName={item} />
                  <div className="arrow">&#8594;</div>
                  </React.Fragment>
                )}
                {bus[index] !== 'redundant' && index < shortestPath.length - 1 && (
                  <React.Fragment>
                      <div className='bus-info-container'>
                      <StationItem stationName={item} />
                  <div className="arrow">&#8594;</div>
                      <div className="bus-info">{bus[index]}</div>
                      <div className="arrow">&#8594;</div>
                    </div>
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