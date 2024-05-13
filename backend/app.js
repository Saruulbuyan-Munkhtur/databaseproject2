const express = require('express');
const sequelize = require('./src/config/database');
// const linesRoutes = require('./src/routes/lineRoutes');
const stationRoutes = require('./src/routes/stationRoutes');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
// app.use('/lines', linesRoutes);
app.use('/stations', stationRoutes);

// Sync database and start the server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });