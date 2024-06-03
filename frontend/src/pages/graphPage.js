import React, { useState } from 'react';
import ShortestPath from '../components/graph/shortestPath';
import AdjacencyList from '../components/graph/adjacencyList';
import UpdateStationStatus from '../components/graph/updateStationStatus';
import Buses from '../components/graph/Buses';

const GraphPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('shortestPath');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'shortestPath':
        return <ShortestPath />;
      case 'adjacencyList':
        return <AdjacencyList />;
      case 'updateStationStatus':
        return <UpdateStationStatus />;
      case 'getbuses':
        return <Buses />
      default:
        return null;
    }
  };

  return (
    <div className="graph-page">
      <h1>Graph Operations</h1>
      <div className="graph-menu">
        <button onClick={() => setSelectedComponent('shortestPath')}>Shortest Path</button>
        <button onClick={() => setSelectedComponent('adjacencyList')}>Adjacency List</button>
        <button onClick={() => setSelectedComponent('updateStationStatus')}>Update Station Status</button>
        <button onClick={() => setSelectedComponent('getbuses')}>Buses</button>
      </div>
      <div className="graph-content">{renderComponent()}</div>
    </div>
  );
};

export default GraphPage;