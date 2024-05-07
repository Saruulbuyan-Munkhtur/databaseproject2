const express = require('express');
const app = express();
const stationRoutes = require('./src/routes/stationRoutes');
const stationServices = require('./src/services/stationService');

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
	<p><a href="/station-table">View Station Table</a></p>

      </body>
    </html>
  `;

  // Send the HTML response
  res.send(html);
});

// Define the route for the station table page
app.get('/station-table', async (req, res) => {
	try {
	  // Fetch the list of stations from the database using the station services
	  const stations = await stationServices.getAllStations();
      
	  // Generate the HTML content with the station table
	  const html = `
	    <!DOCTYPE html>
	    <html>
	      <head>
		<title>Station Table</title>
		<style>
		  table {
		    border-collapse: collapse;
		    width: 100%;
		  }
		  th, td {
		    border: 1px solid black;
		    padding: 8px;
		    text-align: left;
		  }
		  th {
		    background-color: #f2f2f2;
		  }
		</style>
	      </head>
	      <body>
		<h1>Station Table</h1>
		<table>
		  <thead>
		    <tr>
		      <th>English Name</th>
		      <th>District</th>
		      <th>Introduction</th>
		      <th>Chinese Name</th>
		    </tr>
		  </thead>
		  <tbody>
		    ${stations.map(station => `
		      <tr>
			<td>${station.station_english_name}</td>
			<td>${station.district}</td>
			<td>${station.intro}</td>
			<td>${station.chinese_name}</td>
		      </tr>
		    `).join('')}
		  </tbody>
		</table>
		<p><a href="/">Back to Home</a></p>
	      </body>
	    </html>
	  `;
      
	  // Send the HTML response
	  res.send(html);
	} catch (error) {
	  console.error('Error retrieving stations:', error);
	  res.status(500).send('Internal Server Error');
	}
      });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});