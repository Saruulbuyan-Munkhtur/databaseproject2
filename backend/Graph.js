require('dotenv').config({path: '/Users/harroldtok/databaseproject2/backend/.env'});
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  });

const Lines_Station = require('./src/models/lines_station.js');
const { group } = require('console');
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
      for (const { station_name, position,status } of stationsForLine) {
        const nodeId = `${station_name}`;
        const nodeName = `${station_name}`;
  
        if (!graph.has(nodeName)) {
          graph.set(nodeId, new Node(nodeName));
        }

        if (position > 1) {
            const prevStation = stationsForLine.find(station => station.position === position - 1);
            const prevNodeId = `${prevStation.station_name}`;
            
            // Check if both the current station and the previous station are operational
            if (prevStation.status === 'OPERATIONAL' && status === 'OPERATIONAL') {
                // Ensure the current station and the previous station are added to the graph
                if (!graph.has(nodeId)) {
                    graph.set(nodeId, new Node(nodeId));
                }
                if (!graph.has(prevNodeId)) {
                    graph.set(prevNodeId, new Node(prevNodeId));
                }
        
                // Add edges between the current station and the previous station
                graph.get(nodeId).addNeighbor(prevNodeId);
                graph.get(prevNodeId).addNeighbor(nodeId);
            }
        }
                
      }
    }
  
    return graph;
  }

  async function shortestPath(startNodeName, endNodeName) {
    try {
        const graph = await buildGraph(Lines_Station);
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
    } catch (error) {
        throw new Error("Error fetching data:", error);
    }
}


    const modifyStatus = async (station_name, updatedStatus) => {
        try {
            // Find the stations by their English name
            const stations = await Lines_Station.findAll({
                where: { station_name: station_name },
            });
    
            if (!stations || stations.length === 0) {
                console.log(`Station with English name "${station_name}" not found.`);
                return;
            }
    
            // Update each station with the new details
            for (const station of stations) {
                await station.update({status: updatedStatus});
                console.log('Status modified successfully:', station.toJSON());
            }
        } catch (error) {
            console.error('Error updating station:', error);
        }
    };
    

    async function printAdjacencyList(stationName) {
        try {
            const graph2 = await buildGraph(Lines_Station);
            if (graph2.has(stationName)) {
                const stationNode = graph2.get(stationName);
                console.log(`Adjacency list of station '${stationName}':`);
                for (const neighbor of stationNode.adj.keys()) {
                    console.log(neighbor);
                }
            } else {
                console.log(`Station '${stationName}' not found in the graph.`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function getAdjacencyList(stationName) {
        try {
          const graph = await buildGraph(Lines_Station);
          if (graph.has(stationName)) {
            const stationNode = graph.get(stationName);
            const adjacencyList = Array.from(stationNode.adj.keys());
            return adjacencyList;
          } else {
            throw new Error(`Station '${stationName}' not found in the graph.`);
          }
        } catch (error) {
          throw new Error(`Error getting adjacency list: ${error.message}`);
        }
      }

    shortestPath('Wuhe', 'Huangbeiling')
    .then((path) => {
        console.log("Shortest path:", path);
    })
    .catch((err) => {
        console.error(err);
    });


module.exports = {printAdjacencyList, modifyStatus, shortestPath, buildGraph, getAdjacencyList};
    

