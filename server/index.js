const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const worker = require('../worker.js');

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/events', (req, res) => {
  worker.getEventsFromEB(req.body);
  // console.log('server', req.body)
  res.send(req.body);
})

const port = 3000;

app.listen(port, () => {
  console.log('listening on port ' + port);
})
