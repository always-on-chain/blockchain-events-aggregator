const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const worker = require('../worker.js');
const database = require('../database/events.js');

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/events', (req, res) => {
  worker.getEventsFromEB();
  database.get((events) => {
    res.send(events);
  })
})

const port = 3000;

app.listen(port, () => {
  console.log('listening on port ' + port);
})
