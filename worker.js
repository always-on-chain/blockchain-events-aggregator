// const mongoose = require('mongoose');
const request = require('request');
const config = require('./config.js');

const getEventsFromEB = () => {
  console.log('KEY', config.TOKEN)
  let events = {
    url: `https://www.eventbriteapi.com/v3/events/search/?token=${config.TOKEN}?q=${'blockchain'}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${config.TOKEN}`
    }
  };

  request(events, (err, response, body) => {
    console.log('error:', err); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', JSON.parse(body).events[0].venue_id); // Print the HTML for the Google homepage.
    let venue = JSON.parse(body).events[0].venue_id
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
      console.log('body:', JSON.parse(body).address.city); 
    })
  });
}

module.exports.getEventsFromEB = getEventsFromEB;