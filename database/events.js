const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/events');

const eventSchema = mongoose.Schema({
  id: {type: String, unique: true},
  name: String,
  start: String,
  end: String,
  url: String,
  address: String,
  city: String
});

const Event = mongoose.model('Events', eventSchema);

const venues = [];

const getVenues = (venue) => {
  let venueObj = JSON.parse(venue);
  let venueObjInserted = false;
  for (var i = 0; i < venues.length; i++) {
    if (venues[i].id === venueObj.id) {
      venueObjInserted = true;
    }
  }
  if (!venueObjInserted) {
    venues.push(JSON.parse(venue));
  }
}

let save = (events) => {
  let event;
  let venueID;
  let venueAddress;
  let venueCity;

  for (var i = 0; i < events.length; i++) {
    venueID = events[i].venue_id;
    // console.log('ID', venueID)
    for (var j = 0; j < venues.length; j++) {
      // console.log('venues id', venues[j].id)
      if (venues[j].id === venueID) {
        venueAddress = venues[i].address.address_1;
        venueCity = venues[i].address.city;

        event = new Event ({
          id: events[i].id,
          name: events[i].name.text,
          start: events[i].start.local,
          end: events[i].end.local,
          url: events[i].url,
          address: venueAddress,
          city: venueCity
        })

        event.save((err, story) => {
          // if (err) return console.error(err);
        });
      }
    }
  }
}

let get = (callback) => {
  Event.find((err, events) => {
    if (err) return console.log('ERROR on Find', err);
    callback(events);
  })
}

module.exports.save = save;
module.exports.get = get;
module.exports.getVenues = getVenues;



