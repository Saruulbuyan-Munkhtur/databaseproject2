const express = require('express');
const sequelize = require('./src/config/database');
const linesRoutes = require('./src/routes/lineRoutes');
const stationRoutes = require('./src/routes/stationRoutes');
const line_stationRoutes = require('./src/routes/line_stationRoutes');
const rideRoutes = require('./src/routes/rideRoutes');
const graphRoutes = require('./src/routes/graphRoutes');
const viewRoutes = require('./src/routes/viewRoutes');
const cors = require('cors');
const app = express();
const {AvgTravelTime, StationPopularity, PeakHours} = require('./src/models/views');


// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/line', linesRoutes);
app.use('/stations', stationRoutes);
app.use('/lines', line_stationRoutes);
app.use('/rides', rideRoutes);
app.use('/register-ride-using-card', rideRoutes);
app.use('/register-ride-using-passenger', rideRoutes);
app.use('/graph', graphRoutes);
app.use('/exit-using-passenger', rideRoutes)
app.use('/exit-using-card', rideRoutes)
app.use('/nth-param-search', rideRoutes)
app.use('/find-nth-position', linesRoutes)
app.use('/views', viewRoutes);

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