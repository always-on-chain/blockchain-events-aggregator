const mongoose = require('mongoose');
mongoose.connect('mongodb://database/events');

const eventSchema = mongoose.Schema({
  id: {type: String, unique: true},
  url: String,
});

const Event = mongoose.model('Events', eventSchema);

let save = (events) => {
  console.log('DB length', events.length)
  let event;
  for (var i = 0; i < events.length; i++) {
    event = new Event ({
      id: events[i].id,
      url: events[i].url
    })

    event.save((err, story) => {
      // if (err) return console.error(err);
    });
  }
}

module.exports.save = save;


