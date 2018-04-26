const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const worker = require('../worker.js');
const database = require('../database/events.js');

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/events', (req, res) => {
  worker.getEventsFromEB(req.body);
  database.get((events) => {
    res.send(events);
  })
})

//Do get requests from database to render events
//Think about how to limit the api calls and look up api calls limits

const port = 3000;

app.listen(port, () => {
  console.log('listening on port ' + port);
})
