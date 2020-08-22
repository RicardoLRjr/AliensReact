import React, {Component} from 'react';
import propTypes from 'prop-types';
import Canvas from "./components/Canvas"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas/>
      </div>
    );
  }
}

App.propTypes = {
  message: propTypes.string.isRequired,
};

export default App;