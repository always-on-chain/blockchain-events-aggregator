const request = require('request');
const mongoose = require('mongoose');
const config = require('./config.js');
const database = require('./database/events.js');
const Promise = require('bluebird');
const rp = require('request-promise');

mongoose.connect('mongodb://localhost/events');

const getEventsFromEB = () => {
  let events = {
    url: `
    https://www.eventbriteapi.com/v3/events/search/?token=${config.TOKEN}
    &location.address=${'San Francisco'}
    &q=${'blockchain'}
    `,
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${config.TOKEN}`
    }
  };

  return new Promise ((resolve, reject) => {
    rp(events)
      .then((events) => {
        events = JSON.parse(events).events;
        database.save(events);
        return events;
      })
      .then((events) => {
        let promises = [];

        for (var i = 0; i < events.length; i++) {
          let venue = JSON.parse(events[i].venue_id);
          let location = {
            url: `https://www.eventbriteapi.com/v3/venues/${venue}/?token=${config.TOKEN}`,
            headers: {
              'User-Agent': 'request',
              'Authorization': `Bearer ${config.TOKEN}`
            }
          }
          let locationPromise = rp(location)
            .then((location) => {
              database.getVenues(location);
            })
            promises.push(locationPromise);
        }
        Promise.all(promises)
          .then(resolve)
          .catch((err) => {
            reject(err)
          });
      })
  })
}

module.exports.getEventsFromEB = getEventsFromEB;
