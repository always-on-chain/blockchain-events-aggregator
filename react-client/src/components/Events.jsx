import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

const Events = (props) => {
  return (
  <div id="events">
    {props.events.length > 0 ? props.events.map((event) => {
      console.log(event.start);
      let index = event.start.search('T') + 1;
      let time = event.start.slice(index, index + 5);
      let date = event.start.slice(5, index - 1);
      return (
      <div id="event">
        <div id="time">Start {moment().format(time + ' a')}</div>
        <div id="name"><a href={event.url}>{event.name}</a></div>
      </div>
      )
    }) : ''}
  </div>
  )
};

export default Events;