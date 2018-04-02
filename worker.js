// const mongoose = require('mongoose');
const request = require('request');
const config = require('./config.js');

const getEventsFromEB = () => {
  console.log('KEY', config.TOKEN)
  let options = {
    url: `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${config.TOKEN}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}

module.exports.getEventsFromEB = getEventsFromEB;