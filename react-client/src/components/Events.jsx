import React from 'react';
import Event from './Event.jsx'

const Events = (props) => {
  return (
    <div id="events">
      {props.events.map((event) => {
        return (
          <Event event={event} />
        )
      })}
    </div>
    )
};

export default Events;