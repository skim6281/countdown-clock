import React from 'react';
import ReactDOM from 'react-dom';



class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: []
    }
    this.getTimes = this.getTimes.bind(this);
    this.renderTimes = this.renderTimes.bind(this);
  }

  componentDidMount() {
    this.getTimes();
  }

  getTimes() {
    const url = 'https://api.sidewalklabs.com/codechallenge/commits';
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(xmlhttp.response);
        this.setState({times: data});
      }
    };
    xmlhttp.open('GET', url);
    xmlhttp.send();
  }

  renderTimes() {
    return this.state.times.map(time => {
      let date = new Date(time*1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = date.getFullYear();
      var month = months[date.getMonth()];
      var day = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
      // var formattedTime = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      var formattedTime = date + "";
      return(
        <div>
          {formattedTime}
        </div>
      )
    });
  }

  render() {
    return(
      <div>
        TIME
        <div>
          {this.renderTimes()}
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Clock/>, document.getElementById('main'));
});
