const mongoose = require('mongoose');
const axios = require('axios');

mongoose.connect('mongodb://localhost/events');

const eventSchema = mongoose.Schema({
  id: {type: String, unique: true},
  name: String,
  start: String,
  end: String,
  url: String,
  address: String,
  city: String,
  image: String,
  venueId: String
});

const Event = mongoose.model('Events', eventSchema);

const saveAddressCity = (id, address, city) => {
  return new Promise((resolve, reject) => {
    resolve({id: id, address: address, city: city});
  })
}

const saveVenues = (venues) => {
  for (var i = 0; i < venues.length; i++) {
    var id = venues[i].id;
    var address = venues[i].address;
    var city = venues[i].city;

    if (address === null) {
      address = 'The venue to be confirmed later. Stay tuned!';
    }

    saveAddressCity(id, address, city).then((response) => {
      Event.findOne({venueId: response.id}, function (err, event) {
        event.address = response.address;
        event.city = response.city;  
  
        event.save(function (err) {
          if (err) return console.error(err);
        });
      });
    });
  }
}

let save = (events) => {
  let event;

  for (var i = 0; i < events.length; i++) {
    if (events[i].logo === null) {
      events[i].logo = {url: 'https://cdn.evbstatic.com/s3-build/perm_001/f8c5fa/django/images/discovery/default_logos/4.png'}
    }

    event = new Event ({
      id: events[i].id,
      name: events[i].name.text,
      start: events[i].start.local,
      end: events[i].end.local,
      url: events[i].url,
      address: null,
      city: null,
      image: events[i].logo.url,
      venueId: events[i].venue_id
    })

    event.save((err) => {
      if (err) return console.error(err);
    });
  }
}

let get = (callback, sort) => {
  if (sort === 'relevance') {
    Event.find((err, events) => {
      if (err) return console.log('ERROR on Find on relevance sort', err);
      callback(events);
    })
  } else {
    Event.find((err, events) => {
      if (err) return console.log('ERROR on Find on date sort', err);
      callback(events);
    })
    .sort({ start: 1 })
  }
  
}

module.exports.save = save;
module.exports.get = get;
module.exports.saveVenues = saveVenues;



