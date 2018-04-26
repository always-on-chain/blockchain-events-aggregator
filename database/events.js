const mongoose = require('mongoose');
mongoose.connect('mongodb://database/events');

const eventSchema = mongoose.Schema({
  id: {type: String, unique: true},
  name: String,
  start: String,
  end: String,
  url: String,
});

const Event = mongoose.model('Events', eventSchema);

let save = (events) => {
  console.log('DB length', events.length)
  let event;
  for (var i = 0; i < events.length; i++) {
    event = new Event ({
      id: events[i].id,
      name: events[i].name.text,
      start: events[i].start.local,
      end: events[i].end.local,
      url: events[i].url
    })

    event.save((err, story) => {
      // if (err) return console.error(err);
    });
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

