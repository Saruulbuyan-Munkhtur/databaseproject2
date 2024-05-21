const Lines = require('../models/lines');
const Lines_Station = require('../models/lines_station');

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