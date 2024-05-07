const express = require('express');
const app = express();
const stationRoutes = require('./src/routes/stationRoutes');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Mount the station routes on the '/stations' path
app.use('/stations', stationRoutes);

// Define the root route
app.get('/', (req, res) => {
  // Fetch the list of stations from the database
  const stations = [
    { station_english_name: 'Guomao'},
    { station_english_name: 'OCT' },
    { station_english_name: 'Taoyuan'},
  ]; // Replace with your own logic to fetch stations from the database

  // Generate the HTML content with station links
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Stations</title>
      </head>
      <body>
        <h1>Stations</h1>
        <ul>
          ${stations.map(station => `
            <li>
              <a href="/stations/${station.station_english_name}">${station.station_english_name}</a>
            </li>
          `).join('')}
        </ul>
      </body>
    </html>
  `;

  // Send the HTML response
  res.send(html);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});