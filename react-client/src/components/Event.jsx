import React from 'react';
import moment from 'moment';

const Event = (props) => {
  let index = props.event.start.search('T') + 1;
  let time = props.event.start.slice(index, index + 5);
  let date = new Date(props.event.start).toDateString();
  let convertedDate = date.slice(0, 10);
  let eventBrite = props.event.url.split('.').includes('eventbrite');
  let source; 

  if (eventBrite) {
    source = '/images/Eventbrite_wordmark_orange.jpg'
  }

  return (
    <div id="event">
      <img id="image" src={props.event.image} />
      <div id="event-info">
        <div id="name"><a href={props.event.url} target="_blank">{props.event.name}</a></div>
        <div id="time">{convertedDate} {moment().format(time + ' a')} </div>
        <div id="address">{props.event.address}, </div>
        <div id="city">{props.event.city}</div>
        <div id="source">Source: <img src={source} id="source-image"/></div>
      </div>
    </div>
    )
};

export default Event;