const Lines = require('../models/lines');
const Lines_Station = require('../models/lines_station');
const Station = require('../models/stations');
const { Op } = require('sequelize');
const {Sequelize} = require('sequelize');

exports.getAllLines = async () => {
  try {
    const lines = await Lines.findAll();
    return lines;
  } catch (error) {
    throw new Error('Failed to fetch lines');
  }
};

exports.getLineByName = async (lineName) => {
  try {
    const line = await Lines.findByPk(lineName);
    return line;
  } catch (error) {
    throw new Error('Failed to fetch line');
  }
};

exports.createLine = async (lineName, intro, mileage, color, first_opening, url, start,end) => {
  try {
    const newLine = await Lines.create({
      line_name: lineName,
      intro: intro,
      mileage: mileage,
      color: color,
      first_opening: first_opening,
      url: url,
      start_time: start,
      end_time: end,
    });
    console.log('Data inserted successfully:', newLine.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

exports.updateLine = async (lineName, updatedData) => {
  try {
    const line = await Lines.findByPk(lineName);
    if (line) {
      await line.update(updatedData);
      return line;
    }
    return null;
  } catch (error) {
    throw new Error('Failed to update line');
  }
};

exports.deleteLine = async (line_name) => {
  try {
    

    const linesWithStation = await Lines_Station.findAll({
      where: {
        line_name: line_name,
      }
    })
    for(const stations of linesWithStation){
      stations.destroy();
    }
    // Find the station by its English name
    console.log("lineService.js: ", line_name);
    const line = await Lines.findByPk(line_name);

    if (!line) {
      console.log(`Line with name "${line_name}" not found.`);
      return;
    }

    // Update the station with the new details
    await line.destroy();

    console.log('Line destroyed', line.toJSON());
    return true;
  } catch (error) {
    console.error('Error updating line:', error);
  }
};

exports.findNthStation = async (lineName, stationName, n) => {
  try {
    const station = await Station.findOne({
      where: { station_english_name: stationName },
  });

  if (!station) {
      console.log(`Station with name "${stationName}" not found.`);
      return;
  }

  const checkStation = await Lines_Station.findOne({
    where: {
        line_name: lineName,
        station_name: stationName,
    }
});
let x = checkStation.position + n;
let y = checkStation.position - n;

const nthStations = await Lines_Station.findAll({
  where: {
    line_name: lineName,
    position: {
      [Op.or]: [x, y]
    }
  }
});

for(const n of nthStations){
  console.log(n.station_name);
}

  return nthStations;

  } catch (error) {
      console.error('Error updating positions after insertion:', error);
  }
};

exports.deleteLineStation = async (lineName, stationName) => {
  try {
    const stationToDestroy = await Lines_Station.findOne({
      where: { line_name: lineName, station_name: stationName }
    });

    if (!stationToDestroy) {
      throw new Error('Station to delete not found');
    }

    const stationsToUpdate = await Lines_Station.findAll({
      where: {
        line_name: lineName,
        position: { [Sequelize.Op.gt]: stationToDestroy.position }
      }
    });

    for (const stationToUpdate of stationsToUpdate) {
      await stationToUpdate.update({ position: stationToUpdate.position - 1 });
    }

    await Lines_Station.destroy({ where: { line_name: lineName, station_name: stationName } });

    return { message: 'Station deleted successfully' };
  } catch (error) {
    console.error('Failed to delete line station:', error.message);
    throw new Error('Failed to delete line station: ' + error.message);
  }
};

exports.verifyStation = async (lineName, stationName) => {
  try{
    console.log(lineName)
      const station = await Station.findOne({
        where: {station_english_name: stationName},
      })

      if(station){
        const stations = await Lines_Station.findAll({
          where: {station_name: stationName},
        })

        for(const s of stations){
          if(s.line_name == lineName){
            return false;
          }
        }
      }
      return station;
  } catch (error){
    throw new Error('Not Eligible');
  }
}


exports.placeStationsOnLine = async (lineName, stationNames, position, status) => {
  try {
      // Find the line by name
      const line = await Lines.findOne({
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



