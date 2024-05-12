require('dotenv').config({path: '/Users/harroldtok/databaseproject2/backend/.env'});
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  });

const Lines_Station = require('./src/models/lines_station.js');
class Node {
    constructor(name) {
      this.name = name;
      this.adj = new Map(); // Adjacency list to store neighbors and weights
    }
  
    addNeighbor(neighbor) {
      this.adj.set(neighbor);
    }
  
    removeNeighbor(neighbor) {
      this.adj.delete(neighbor);
    }
  
    getNeighbors() {
      return this.adj.keys();
    }
  
    getWeight(neighbor) {
      return this.adj.get(neighbor);
    }

    getName(){
        return this.name;
    }
  }

  async function buildGraph(linesStationData) {
    const graph = new Map();
  
    const Data = await Lines_Station.findAll();
  
    // Iterate over each line
    for (const { line_name } of Data.map(row => ({ line_name: row.line_name })).filter((value, index, self) => self.findIndex(t => t.line_name === value.line_name) === index)) {
      // Get stations for the current line
      const stationsForLine = Data.filter(row => row.line_name === line_name);
  
      // Create nodes for each station in the current line
      for (const { station_name, position } of stationsForLine) {
        const nodeId = `${station_name}`;
        const nodeName = `${station_name}`;
  
        if (!graph.has(nodeName)) {
          graph.set(nodeId, new Node(nodeName));
        }

        if (position > 1) {
            const prevStation = stationsForLine.find(station => station.position === position - 1);
            const prevNodeId = `${prevStation.station_name}`;
            graph.get(nodeId).addNeighbor(prevNodeId);
            if (!graph.has(prevNodeId)) {
                graph.set(prevNodeId, new Node(prevNodeId));
            }
            graph.get(prevNodeId).addNeighbor(nodeId);
        }
      }
    }
  
    return graph;
  }

  async function shortestPath(graph, startNodeName, endNodeName) {
    // Check if start and end nodes exist in the graph
    if (!graph.has(startNodeName) || !graph.has(endNodeName)) {
        throw new Error("Start or end node not found in the graph");
    }

    const distances = new Map(); // Map to store distances from the start node
    const previousNodes = new Map(); // Map to store previous nodes in the shortest path
    const queue = new Set(); // Set to store nodes to be visited

    // Initialize distances and previousNodes
    for (const node of graph.values()) {
        distances.set(node.name, Infinity);
        previousNodes.set(node.name, null);
        queue.add(node.name);
    }
    distances.set(startNodeName, 0); // Distance from start node to itself is 0

    while (queue.size > 0) {
        // Find the node in the queue with the smallest distance
        let minDistanceNode = null;
        for (const node of queue) {
            if (!minDistanceNode || distances.get(node) < distances.get(minDistanceNode)) {
                minDistanceNode = node;
            }
        }

        queue.delete(minDistanceNode);

        // Exit if the minimum distance node is the end node
        if (minDistanceNode === endNodeName) {
            break;
        }

        // Update distances and previousNodes for neighboring nodes
        const currentNode = graph.get(minDistanceNode);
        for (const neighborId of currentNode.adj.keys()) {
            const neighborNode = graph.get(neighborId);
            const distanceToNeighbor = distances.get(minDistanceNode) + 1; // Assuming all edges have weight 1
            if (distanceToNeighbor < distances.get(neighborNode.name)) {
                distances.set(neighborNode.name, distanceToNeighbor);
                previousNodes.set(neighborNode.name, minDistanceNode);
            }
        }
    }

    // Reconstruct the shortest path from startNodeName to endNodeName
    const shortestPath = [];
    let currentNode = endNodeName;
    while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = previousNodes.get(currentNode);
    }

    return shortestPath;
}

  
buildGraph(Lines_Station)
.then((graph) => {
    const startNodeName = "Tanglang"; // Replace with actual start station name
    const endNodeName = "Hongshan"; // Replace with actual end station name
    return shortestPath(graph, startNodeName, endNodeName);
})
.then((path) => {
    console.log("Shortest path:", path);
})
.catch((err) => {
    console.error("Error:", err);
});



