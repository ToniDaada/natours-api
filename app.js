const fs = require('fs');
const express = require('express');

// Initializing express
const app = express();

// // Creating the route
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server side!',
//     status: true,
//   });
// });

// app.post('/', (req, res) => {
//   res.send('You can send to this endpoint');
// });
// Open a server

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

/* This code snippet is setting up a server using Express.js. It is defining a port number 3000 using
`const port = 3000` and then starting the server to listen on that port using
`app.listen(port,()=>{...})`. When the server starts running, it will log a message to the console
saying "App running on port 3000". */

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
