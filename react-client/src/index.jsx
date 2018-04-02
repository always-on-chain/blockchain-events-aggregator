import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Events from './components/Events.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: dummy
    };
  }

  fetch() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/events',
      contentType: 'application/json',
      success: (data) => {
        // this.setState({
        //   events: data
        // });
        console.log('success', this.state.events)
      },
      error: (error) => {
        console.log('ERROR on ajax Get request', error);
      }
    })
  }

  componentWillMount() {
    this.fetch();
  }

  render() {
    return (
    <Events events={this.state.events} /> 
    )
  }
}

let dummy = [{
  name: 'Blockchain festival',
  description: 'great event happening',
  url: 'www.techcrunch.com',
  start: '7: 30pm',
  end: '11:00pm',
  location: 'San Francisco'
}];

ReactDOM.render(<App />, document.getElementById('app'));

