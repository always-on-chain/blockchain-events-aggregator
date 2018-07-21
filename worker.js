const request = require('request');
const mongoose = require('mongoose');
const config = require('./config.js');
const database = require('./database/events.js');
const axios = require('axios');

mongoose.connect('mongodb://localhost/events');

const eventbriteHeaders = {
  'User-Agent': 'request',
  'Authorization': `Bearer ${config.EventBrightToken}`
}

const getEventsFromEB = (location, type) => {
  var mainUrl = `https://www.eventbriteapi.com/v3/events/search/?token=${config.EventBrightToken}
  &location.address=${location}
  &q=${type}`;

  axios.get(mainUrl, {'headers': eventbriteHeaders}).then((response) => {
    var promises = [];
    var events = response.data.events;

    events.forEach((event, i) => {
      var venue = event.venue_id;
      var venueUrl = `https://www.eventbriteapi.com/v3/venues/${venue}/?token=${config.EventBrightToken}`;
      promises.push(axios.get(venueUrl, {'headers': eventbriteHeaders}));
    })

    database.saveEvents(events);
    return promises;
  }).then((response) => {
    return axios.all(response);
  }).then((response) => {
    var venueObjects = response;
    var venues = [];

    for (var i = 0; i < venueObjects.length; i++) {
      venues.push({
        address: venueObjects[i].data.address.address_1,
        city: venueObjects[i].data.address.city,
        id: venueObjects[i].data.id
      });
    }
    
    database.saveVenues(venues);
  }).catch((e) => {
    console.log(e);
  })
}

// const getEventsFromMeetup = () => {
//   let options = {
//     // url: `https://api.meetup.com/2/events?key=${config.MeetupToken}&group_urlname=ny-tech&sign=true`,
//     url: `https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&page=20&text=blockchain&key=${config.MeetupToken}`,
//     // url: `https://api.meetup.com/find/upcoming_events?key=${config.MeetupToken}&photo-host=public&text='blockchain'&zip=94102&radius=10&sign=true`,
//     headers: {
//       'User-Agent': 'request',
//       'Authorization': `Bearer ${config.MeetupToken}`
//     }
//   };

//   request(options, (error, response, body) => {
//     console.log('error:', error); 
//     console.log('statusCode:', response.statusCode);
//     console.log('body:', body);
//   });
// }

module.exports.getEventsFromEB = getEventsFromEB;
// module.exports.getEventsFromMeetup = getEventsFromMeetup;


