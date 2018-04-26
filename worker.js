// const mongoose = require('mongoose');
const request = require('request');
const mongoose = require('mongoose');
const config = require('./config.js');
const database = require('./database/events.js');
mongoose.connect('mongodb://localhost/events');

const getEventsFromEB = () => {
  let events = {
    url: `
    https://www.eventbriteapi.com/v3/events/search/?token=${config.TOKEN}
    &location.address=${'944 Market St. San Francisco, CA, 94102'}
    &q=${'blockchain'}
    `,
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${config.TOKEN}`
    }
  };

  request(events, (err, response, body) => {
    console.log('error:', err); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    let events = JSON.parse(body).events
    console.log('LENGTH of', events);
    
    for (var i = 0; i < events.length; i++) {
      let venue = JSON.parse(body).events[i].venue_id
      let location = {
        url: `https://www.eventbriteapi.com/v3/venues/${venue}/?token=${config.TOKEN}`,
        headers: {
          'User-Agent': 'request',
          'Authorization': `Bearer ${config.TOKEN}`
        }
      }
      request(location, (err, response, body) => {
        console.log('error:', err); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', JSON.parse(body));
        console.log('events', events)
        // let obj = JSON.parse(body);
        // events[i].obj = obj;
        // console.log(events[i].obj)
      })
    }

    database.save(events);
  });
}

module.exports.getEventsFromEB = getEventsFromEB;