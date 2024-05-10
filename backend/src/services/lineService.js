const Lines = require('./models/lines');

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

exports.createLine = async (lineData) => {
  try {
    const createdLine = await Lines.create(lineData);
    return createdLine;
  } catch (error) {
    throw new Error('Failed to create line');
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

exports.deleteLine = async (lineName) => {
  try {
    const line = await Lines.findByPk(lineName);
    if (line) {
      await line.destroy();
      return line;
    }
    return null;
  } catch (error) {
    throw new Error('Failed to delete line');
  }
};