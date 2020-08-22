import React, {Component} from 'react';
import propTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.message}
      </div>
    );
  }
}

App.propTypes = {
  message: propTypes.string.isRequired,
};

export default App;