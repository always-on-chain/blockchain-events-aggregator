// const mongoose = require('mongoose');
const request = require('request');
const mongoose = require('mongoose');
const config = require('./config.js');
const database = require('./database/events.js');
mongoose.connect('mongodb://localhost/events');

const getEventsFromEB = () => {
  console.log('KEY', config.TOKEN)
  let events = {
    // url: `https://www.eventbriteapi.com/v3/events/search/?q=${'blockchain'}&token=${config.TOKEN}`,
    url: `https://www.eventbriteapi.com/v3/events/search/?token=${config.TOKEN}
    &location.address=${'944 Market St. San Francisco, CA, 94102'}
    &q=${'blockchain'}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${config.TOKEN}`
    }
  };

  request(events, (err, response, body) => {
    console.log('error:', err); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body: length ', JSON.parse(body).events); // Print the HTML for the Google homepage.
    let events = JSON.parse(body).events
    console.log('LENGTH of', events.length);
    // console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
    // let venue = JSON.parse(body).events[2].venue_id
    // let location = {
    //   url: `https://www.eventbriteapi.com/v3/venues/${venue}/?token=${config.TOKEN}`,
    //   headers: {
    //     'User-Agent': 'request',
    //     'Authorization': `Bearer ${config.TOKEN}`
    //   }
    // }
    // request(location, (err, response, body) => {
    //   console.log('error:', err); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   // console.log('body:', JSON.parse(body).address.city); 
    //   console.log('body:', JSON.parse(body)); 
    // })
    database.save(events);
  });
}

module.exports.getEventsFromEB = getEventsFromEB;