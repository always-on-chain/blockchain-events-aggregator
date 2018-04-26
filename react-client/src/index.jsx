import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Events from './components/Events.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  fetch() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/events',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          events: data
        });
        console.log('success with data ', data)
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

ReactDOM.render(<App />, document.getElementById('app'));

