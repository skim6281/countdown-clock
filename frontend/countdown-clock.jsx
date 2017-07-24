import React from 'react';
import ReactDOM from 'react-dom';

class Root extends React.Component {
  render() {
    return(
      <div>
        TIME
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("hello");
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
