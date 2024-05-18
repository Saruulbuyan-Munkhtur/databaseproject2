require('dotenv').config({path: '/Users/harroldtok/databaseproject2/backend/.env'});
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  });


const Station = require('./src/models/stations.js');
const Line = require('./src/models/lines.js');
const Passengers = require('./src/models/passengers.js');
const UserID_Rides = require('./src/models/userid_rides.js');
const Cards = require('./src/models/cards.js');
const CardID_Rides = require('./src/models/cardid_rides.js');
const Lines_Station = require('./src/models/lines_station.js');
const { get } = require('http');
const { stat } = require('fs');
  

module.exports = sequelize;

const addStation = async (lineName, stationName, district, intro, chineseName, position, status) => {
  try {
    const newStation = await Station.create({
      station_english_name: stationName,
      district: district,
      intro: intro,
      chinese_name: chineseName
    });
    console.log('Data inserted successfully:', newStation.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
  await placeStationsOnLine(lineName, [stationName], position, status);
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

const updatePositionsAfterDeletion = async (deletedPosition) => {
    try {
        // Find stations in Lines_Station table with positions greater than the deleted position
        const stationsToUpdate = await Lines_Station.findAll({
            where: {
                position: { [Sequelize.Op.gt]: deletedPosition }
            }
        });

        // Update positions of stations
        for (const stationToUpdate of stationsToUpdate) {
            await stationToUpdate.update({ position: stationToUpdate.position - 1 });
        }

        console.log(`Positions updated for stations after position ${deletedPosition}`);
    } catch (error) {
        console.error('Error updating positions after deletion:', error);
    }
};

const addLine = async (lineName, intro, mileage, color, first_opening, url, start,end) => {
  try {
    const newLine = await Line.create({
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

      const linesWithStation = await Lines_Station.findAll({
        where: {
          line_name: line_name,
        }
      })
      for(const lines of linesWithStation){
        lines.destroy();
      }
  
      console.log('Line destroyed', line.toJSON());
    } catch (error) {
      console.error('Error updating line:', error);
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


//Miscellaneous functions

const reloadCard = async (Code, amount) => {
  try {
    const card = await Cards.findOne({
      where: { code: Code }
    });

    if (!card) {
      console.error('Card not found');
      return;
    }

    const updatedCard = await Cards.update(
      { money: Sequelize.literal(`money + ${amount}`) },
      { where: { code: Code }, returning: true }
    );

    console.log('Money will arrive soon');
  } catch (err) {
    console.error('Error updating card:', err);
  }
};

const modifyPosition = async (lineName, stationName, position) => {
  try {
    const maxPosition = await Lines_Station.max('position', {
      where: { line_name: lineName }
    });
      // Find the station by its English name
      const station = await Station.findOne({
          where: { station_english_name: stationName }
      });

      if (!station) {
          console.log(`Station with English name "${stationName}" not found.`);
          return;
      }

      const des = await Lines_Station.findOne({
        where: {
          line_name: lineName,
          station_name: stationName,
        }
      })

      const stationsToUpdate = await Lines_Station.findAll({
          where: {
              line_name: lineName,
              position: { [Sequelize.Op.gt]: station.position }
          },
          order: [['position', 'ASC']]
      });

      let y = position;
      for (const stationToUpdate of stationsToUpdate) {
          await stationToUpdate.update({ position: y });
          y++;
      }

      // Delete the existing station
      await des.destroy();

      // Update the positions of remaining stations
      if(position == 1){
        const updatedStations = await Lines_Station.findAll({
          where: {
              line_name: lineName,
              position: { [Sequelize.Op.gte]: position }
          },
          order: [['position', 'ASC']]
      });

      y = position + 1;
      for (const updatedStation of updatedStations) {
          await updatedStation.update({ position: y });
          y++;
      } 
    } else if(position == maxPosition){
      const updatedStations = await Lines_Station.findAll({
        where: {
            line_name: lineName,
            position: { [Sequelize.Op.lte]: position }
        },
        order: [['position', 'DESC']]
    });

    y = position - 1;
    for (const updatedStation of updatedStations) {
        await updatedStation.update({ position: y });
        y--;
    } 

    }else{
        const updatedStations = await Lines_Station.findAll({
          where: {
              line_name: lineName,
              position: { [Sequelize.Op.gt]: position }
          },
          order: [['position', 'ASC']]
      });

      const updatedStations2 = await Lines_Station.findAll({
        where: {
            line_name: lineName,
            position: { [Sequelize.Op.lte]: position }
        },
        order: [['position', 'DESC']]
    });

      y = position + 1;
      for (const updatedStation of updatedStations) {
          await updatedStation.update({ position: y });
          y++;
      }

      y = position - 1;
      for (const updatedStation of updatedStations2) {
          await updatedStation.update({ position: y });
          y--;
      }

      }

      // Create a new station
      const newStation = await Lines_Station.create({
          line_name: lineName,
          station_name: stationName,
          position: position,
          status: 'OPERATIONAL',
      });

      console.log('Data inserted successfully:', newStation.toJSON());
  } catch (error) {
      console.error('Error inserting data:', error);
  }
}


modifyPosition('1号线', 'Laojie', 30);