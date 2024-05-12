require('dotenv').config({path: '/Users/harroldtok/databaseproject2/backend/.env'});
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  });


const Station = require('./src/models/stations.js');
const Line = require('./src/models/lines.js');
const Passengers = require('./src/models/passengers.js');
const UserID_Rides = require('./src/models/userid_rides.js');
const Cards = require('./src/models/cards.js');
const CardID_Rides = require('./src/models/cardid_rides.js');
const Lines_Station = require('./src/models/lines_station.js');
const { get } = require('http');
  

module.exports = sequelize;

const addStation = async () => {
  try {
    const newStation = await Station.create({
      station_english_name: 'test2',
      district: 'test',
      intro: 'test',
      chinese_name: 'test'
    });
    console.log('Data inserted successfully:', newStation.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Function to update a station given an identifier and new data
const modifyStation = async (station_english_name, updatedDetails) => {
    try {
      // Find the station by its English name
      const station = await Station.findOne({
        where: { station_english_name: station_english_name },
      });
  
      if (!station) {
        console.log(`Station with English name "${station_english_name}" not found.`);
        return;
      }
  
      // Update the station with the new details
      await station.update(updatedDetails);
  
      console.log('Station updated successfully:', station.toJSON());
    } catch (error) {
      console.error('Error updating station:', error);
    }
  };


  const deleteStation = async (station_english_name) => {
    try {
      // Find the station by its English name
      const station = await Station.findOne({
        where: { station_english_name: station_english_name },
      });
  
      if (!station) {
        console.log(`Station with English name "${station_english_name}" not found.`);
        return;
      }
  
      // Update the station with the new details
      await station.destroy();
  
      console.log('Station destroyed', station.toJSON());
    } catch (error) {
      console.error('Error updating station:', error);
    }
  };



const addLine = async () => {
  try {
    const newLine = await Line.create({
      line_name: 'test2',
      intro: 'test',
      mileage: 24.69,
      color: 'blue',
      first_opening: 2004-12-28,
      url: 'test',
      start_time: '06:20:00',
      end_time: '06:20:00',
    });
    console.log('Data inserted successfully:', newLine.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Function to update a station given an identifier and new data
const modifyLine = async (line_name, updatedDetails) => {
    try {
      // Find the line by name
      const line = await Line.findOne({
        where: { line_name: line_name },
      });
  
      if (!line) {
        console.log(`line with name "${line_name}" not found.`);
        return;
      }
  
      // Update the line with the new details
      await line.update(updatedDetails);
  
      console.log('Line updated successfully:', line.toJSON());
    } catch (error) {
      console.error('Error updating line:', error);
    }
  };

  const deleteLine = async (line_name) => {
    try {
      // Find the station by its English name
      const line = await Line.findOne({
        where: { line_name: line_name},
      });
  
      if (!line) {
        console.log(`Line with name "${line_name}" not found.`);
        return;
      }
  
      // Update the station with the new details
      await line.destroy();
  
      console.log('Line destroyed', line.toJSON());
    } catch (error) {
      console.error('Error updating line:', error);
    }
  };

  
  const placeStationsOnLine = async (lineName, stationNames, position) => {
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
      await updatePositionsAfterInsertion(lineName, position, x);

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

      // Increment positions of stations by 2
      for (const stationToUpdate of stationsToUpdate) {
          await stationToUpdate.update({ position: stationToUpdate.position + x });
      }

      console.log(`Positions updated for stations with position greater than or equal to ${lastInsertedPosition} by ${x}.`);

  } catch (error) {
      console.error('Error updating positions after insertion:', error);
  }
};

const findNthStation = async (lineName, stationName, n) => {
  try {
    // Check if station exists
    const station = await Station.findOne({
      where: { station_english_name: stationName },
  });

  if (!station) {
      console.log(`Station with name "${stationName}" not found.`);
      // Handle this situation according to your requirements (e.g., skip this station)
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

  for(nthStation of nthStations){
    console.log(nthStation.station_name);
  }

  } catch (error) {
      console.error('Error updating positions after insertion:', error);
  }
};

//7. Can view all information about passengers or cards who have boarded but have not yet exited at the current time.
const currentTime = '2024-03-25 21:51:15.000000'; //Make currentTime userInput

function getBoardedCards(currentTime) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM cardid_rides cr JOIN cards c ON cr.user_code = c.code WHERE STATUS = 'ONGOING' AND cr.start_time <= '${currentTime}';`;

    sequelize.query(query)
      .then(results => {
        console.log('Query executed successfully');
        console.log(results);

        // Resolve the promise with the results
        resolve(results);
      })
      .catch(error => {
        console.error('Error executing SQL query:', error);
        // Reject the promise with the error
        reject(error);
      });
  });
}

function getBoardedPassengers(currentTime) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM userid_rides u JOIN passengers p ON u.user_id = p.id_number WHERE STATUS = 'ONGOING' AND cr.start_time <= '${currentTime}';`;

    sequelize.query(query)
      .then(results => {
        console.log('Query executed successfully');
        console.log(results);

        // Resolve the promise with the results
        resolve(results);
      })
      .catch(error => {
        console.error('Error executing SQL query:', error);
        // Reject the promise with the error
        reject(error);
      });
  });
}

function getAllBoarded(currentTime) {
  return new Promise((resolve, reject) => {
    const query1 = `SELECT * FROM cardid_rides cr JOIN cards c ON cr.user_code = c.code WHERE STATUS = 'ONGOING' AND cr.start_time <= '${currentTime}';`;
    const query2 = `SELECT * FROM userid_rides u JOIN passengers p ON u.user_id = p.id_number WHERE STATUS = 'ONGOING' AND u.start_time <= '${currentTime}';`;

    sequelize.query(query1)
      .then(results => {
        console.log('Query executed successfully');
        console.log(results[0]);

        // Resolve the promise with the results
        resolve(results[0]);
      })
      .catch(error => {
        console.error('Error executing SQL query:', error);
        // Reject the promise with the error
        reject(error);
      });

    sequelize.query(query2)
    .then(results => {
      console.log('Query executed successfully');
      console.log(results[0]);

      // Resolve the promise with the results
      resolve(results[0]);
    })
    .catch(error => {
      console.error('Error executing SQL query:', error);
      // Reject the promise with the error
      reject(error);
    });
  });
}

getAllBoarded(currentTime);
