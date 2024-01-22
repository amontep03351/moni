const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios'); // Require Axios for HTTP requests
const app = express();
const port = 80;

 

// Enable CORS
app.use(cors());

// Function to create a MySQL connection
function createDBConnection() {
    return mysql.createConnection({
        host: '192.168.19.181',
        user: 'NGIS',
        password: 'a1s2d3=-QWE',
        database: 'niceapparel',
    });
}

// Connect to MySQL
let db = createDBConnection();
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
 
        // Retry connection after 5 seconds
        setTimeout(() => {
            db = createDBConnection();
        }, 5000);
    } else {
        console.log('Connected to MySQL');
    }
});

 

// Express Route to Fetch Data
app.get('/query', (req, res) => {
    const query = 'SHOW FULL PROCESSLIST';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        results.forEach(element => {
            console.log(element);
        });
        res.json(results);
    });
});

// Handle MySQL connection errors
db.on('error', (err) => {
    console.error('MySQL connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Reconnect if the connection is lost
        db = createDBConnection();
    } else {
        throw err;
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
