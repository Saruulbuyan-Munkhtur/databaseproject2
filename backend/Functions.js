const { Client } = require('pg');

const client = new Client({
    user: 'harroldtok',
    host: 'localhost',
    database: 'postgres',
    password: '6969',
    port: 5432,
    });

client.connect()
.then(() => console.log('Connected to PostgreSQL server'))
.catch(err => console.error('Error connecting to PostgreSQL server', err));

if (client.connected) {
    console.log('You are currently connected to PostgreSQL server');
    } else {
    console.log('You are not connected to PostgreSQL server');
    }
    
client.query('SELECT * FROM cards')
.then(res => console.log(res.rows))
.catch(err => console.error('Error executing query', err));

client.end()
.then(() => console.log('Connection to PostgreSQL server closed'))
.catch(err => console.error('Error closing connection', err));