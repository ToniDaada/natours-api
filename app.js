const fs = require('fs');
const express = require('express');

// Initializing express
const app = express();

// Middle ware
app.use(express.json());

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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params.id);
  const tour = tours.find((el) => el.id === Number(req.params.id));

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  // console.log(tour);

  res.status(200).json({
    status: 'success',
    // results: tour.length,
    data: {
      tour,
    },
  });
});

/* This code snippet is defining a POST route in the Express.js server. When a POST request is made to
the '/api/v1/tours' endpoint, the server will execute the callback function provided. Here's a
breakdown of what the code inside the callback function is doing: */

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    {
      id: newID,
    },
    req.body,
  );

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );

  // res.send('Done');
});

app.patch('/api/v1/tours/:id', (req, res) => {
  // const tour = tours.find((el) => el.id === Number(req.params.id));x

  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  // const tour = tours.find((el) => el.id === Number(req.params.id));x

  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  res.status(204).json({
    status: 'success',
    data: null,
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
