const express = require('express');
const app = express();
const sequelize = require('./src/config/database');
const stationRoutes = require('./src/routes/stationRoutes');

app.use(express.json());
app.use('/api/stations', stationRoutes);
// Add more routes and middleware as needed

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });