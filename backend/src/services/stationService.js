const Station = require('../models/stations');
const Lines_Station = require('../models/lines_station');
const Line = require('../models/lines');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { modifyPosition, modifyStationStatus } = require('../../Functions');
// Create a new station
async function createStation(lineName, station_english_name, district, intro, chinese_name, position, status) {
  try {
    const newStation = await Station.create({
      station_english_name: station_english_name,
      district: district,
      intro: intro,
      chinese_name: chinese_name
    });
    console.log('Data inserted successfully:', newStation.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
  await placeStationsOnLine(lineName, [station_english_name], position, status);
  }

// Get all stations
async function getAllStations() {
  try {
    const stations = await Station.findAll();
    return stations;
  } catch (error) {
    throw new Error('Error retrieving stations: ' + error.message);
  }
}

// Get a station by ID
async function getStationById(stationId) {
  try {
    const station = await Station.findByPk(stationId);
    if (!station) {
      throw new Error('Station not found');
    }
    return station;
  } catch (error) {
    throw new Error('Error retrieving station: ' + error.message);
  }
}

async function updateStation(lineName, station_english_name, district, intro, chinese_name, position, status) {
  try {
    const station = await Station.findByPk(station_english_name);

    if (!station) {
      console.log('Station not found with ID:', station_english_name);
      return null;
    }

    const updatedStation = await station.update(station_english_name, district, intro, chinese_name);
    console.log('Updated station:', updatedStation);
    modifyPosition(lineName, station_english_name, position);
    modifyStationStatus(lineName, station_english_name, status);
    return updatedStation;
  } catch (error) {
    console.error('Error updating station:', error);
    throw new Error('Error updating station: ' + error.message);
  }
}

// Delete a station
async function deleteStation(stationId) {
  try {
    // Find the station by its English name
    console.log("EOIEHOIEFIOHOHO");
    const station_english_name = stationId;
    const station = await Station.findOne({
        where: { station_english_name: station_english_name },
    });

    if (!station) {
      console.log(`Station with English name "${station_english_name}" not found.`);
      return;
  }

    const stationOnLine = await Lines_Station.findAll({
      where: {
        station_name: station_english_name,
      }
    });

    // Get the station's position
    for(const stations of stationOnLine) {
      const stationPosition = stations.position;
      const stationsToUpdate = await Lines_Station.findAll({
        where: {
            line_name: stations.line_name,
            position: { [Sequelize.Op.gt]: stationPosition }
        },
        order: [['position', 'ASC']]
    });
      y = stations.position;
      for (const stationToUpdate of stationsToUpdate) {
        await stationToUpdate.update({ position: y});
        y++;
      }
      stations.destroy();
    }

    // Delete the station
    await station.destroy();

    console.log('Station destroyed:', station.toJSON());
} catch (error) {
    console.error('Error deleting station:', error);
}
};

const placeStationsOnLine = async (lineName, stationNames, position, status) => {
  try {
      // Find the line by name
      const line = await Line.findOne({
          where: { line_name: lineName },
      });

      if (!line) {
          console.log(`Line with name "${lineName}" not found.`);
          return;
      }

      // Loop through each station name
      let currentPosition = position; // Initialize currentPosition to the specified position
      let x = 0;

      for (const stationName of stationNames) {
        // Check if station exists
        const station = await Station.findOne({
            where: { station_english_name: stationName },
        });

        if (!station) {
            console.log(`Station with name "${stationName}" not found.`);
            // Handle this situation according to your requirements (e.g., skip this station)
            continue;
        }
        x++;
    }
    await updatePositionsAfterInsertion(lineName, position, x, status);

      for (const stationName of stationNames) {
          // Check if station exists
          const station = await Station.findOne({
              where: { station_english_name: stationName },
          });

          if (!station) {
              console.log(`Station with name "${stationName}" not found.`);
              // Handle this situation according to your requirements (e.g., skip this station)
              continue;
          }
          x++;
          // Create association between line and station at specified position
          await Lines_Station.create({
              line_name: lineName,
              station_name: stationName,
              position: currentPosition,
              status: status
          });

          console.log(`Station "${stationName}" placed on line "${lineName}" at position ${currentPosition}.`);

          // Increment currentPosition for the next station
          currentPosition++;
      }
  } catch (error) {
      console.error('Error placing stations on line:', error);
  }
};

const updatePositionsAfterInsertion = async (lineName, lastInsertedPosition, x) => {
try {
    // Find stations on the same line with positions greater than or equal to lastInsertedPosition
    const stationsToUpdate = await Lines_Station.findAll({
        where: {
            line_name: lineName,
            position: { [Sequelize.Op.gte]: lastInsertedPosition }
        }
    });

    for (const stationToUpdate of stationsToUpdate) {
        await stationToUpdate.update({ position: stationToUpdate.position + x });
    }

    console.log(`Positions updated for stations with position greater than or equal to ${lastInsertedPosition} by ${x}.`);

} catch (error) {
    console.error('Error updating positions after insertion:', error);
}
};


module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
};