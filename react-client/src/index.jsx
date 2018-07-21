import React from 'react';
import ReactDOM from 'react-dom';
import Events from './components/Events.jsx';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  fetch(endpoint) {
    axios.get(endpoint)
      .then((response) => {
        console.log('response', response)
        this.setState({events: response.data});
      })
      .catch((error) => {console.log('ERROR on axiox get request', error)});
  }

  componentDidMount() {
    this.fetch('events/relevance');
  }

  handleClick(endpoint) {
    this.fetch(endpoint);
    // this.setState({button: sort}, ()=> {
    //   console.log('currentState', this.state.button)
    //   this.fetch(this.state.button);
    // });
  }

  render() {
    console.log('events', this.state.events)
    return (
    <div id="container">
      <div id="sort">
        <Button id="relevance" onClick={()=> {this.handleClick('events/relevance');}} bsStyle="info">Relevance</Button> 
        <Button id="date" onClick={()=> {this.handleClick('events/date');}} bsStyle="info">Date</Button>
      </div>
      <Events events={this.state.events} /> 
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

