import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

const Events = (props) => {
  return (
  <div id="events">
    {props.events.length > 0 ? props.events.map((event) => {
      console.log('image', event.image);
      let index = event.start.search('T') + 1;
      let time = event.start.slice(index, index + 5);
      let date = event.start.slice(5, index - 1);
      return (
      <div id="event">
        <div id="image"><img src={event.image} /></div>
        <div id="event-info">
          <div id="time">{moment().format(time + ' a')} </div>
          <div id="name"><a href={event.url} target="_blank">{event.name}</a></div>
          <div id="address">{event.address},</div>
          <div id="city">{event.city}</div>
        </div>
      </div>
      )
    }) : ''}
  </div>
  )
};

export default Events;