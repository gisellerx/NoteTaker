const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// client => middleware (pre-processing before giving to server app.use()) => server
// Import custom middleware, "cLog"

// Middleware for parsing JSON and urlencoded form data
// data parser in app.use to parse client data to req.body(original client data object)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to modularize api routes
app.use('/api', api);

// middleware to make homepage url http://localhost:3001 public
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
