import React from 'react';
import ReactDOM from 'react-dom';



class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      averageTime: 0,
      counter: 0
    }
    this.getTimes = this.getTimes.bind(this);
    this.renderTimes = this.renderTimes.bind(this);
    this.getAverageTime = this.getAverageTime.bind(this);
    this.convertSeconds = this.convertSeconds.bind(this);
    this.setCounter = this.setCounter.bind(this);
    this.tick = this.tick.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
  }

  componentWillMount() {
    this.getTimes();
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000);
    if(this.state.counter === 0) {
      clearInterval(this.intervalId);
    }
  }

  tick() {
    this.setState({counter: this.state.counter-1});

  }

  //fetches all commit times from endpoint
  getTimes() {
    const url = 'https://api.sidewalklabs.com/codechallenge/commits';
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(xmlhttp.response);
        this.setState({times: data});
        this.getAverageTime();
        this.setCounter();
      }
    };
    xmlhttp.open('GET', url);
    xmlhttp.send();
  }

  setCounter() {
    if(this.state.times.length >= 1000) {
      this.setState({counter: 0});
    } else {
      let diff = 1000 - this.state.times.length;
      let seconds = this.state.averageTime * diff;
      this.setState({counter: seconds});
    }
  }

  getAverageTime() {
    const intervals = [];
    for(let i = 0; i < this.state.times.length - 1; i++) {
      intervals[i] = this.state.times[i] - this.state.times[i+1];
    }
    let sum = intervals.reduce((total, time) => {
      return total + time;
    }, 0)
    let average = Math.ceil(sum / intervals.length);
    this.setState({averageTime: average});
  }

  convertSeconds(seconds) {
    let delta = seconds;
    let days = Math.floor(delta/86400);
    delta -= days * 86400;

    let hours = Math.floor(delta/3600) % 24;
    delta -= hours * 3600;

    let minutes = Math.floor(delta/60) % 60;
    delta -= minutes * 60;

    let sec = delta % 60;

    return `${days}:${hours}:${minutes}:${sec}`;
  }

  renderTimes() {
    return this.state.times.map(time => {
      let date = new Date(time*1000);
      // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      // var year = date.getFullYear();
      // var month = months[date.getMonth()];
      // var day = date.getDate();
      // var hour = date.getHours();
      // var min = date.getMinutes();
      // var sec = date.getSeconds();
      // var formattedTime = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
     var formattedTime = date + "";
      return(
        <div>
          {formattedTime}
        </div>
      )
    });
  }

  handleCommit() {
    let date = new Date().getTime() / 1000;
    const newTimes = [date, ...this.state.times];
    this.setState({times: newTimes});
    this.getAverageTime();
    this.setCounter();
    console.log("# of commits: " + this.state.times.length);
  }

  render() {
    return(
      <div>
        <div>
          {this.convertSeconds(this.state.counter)}
        </div>
        <button onClick={this.handleCommit}>
          Commit
        </button>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Clock/>, document.getElementById('main'));
});
