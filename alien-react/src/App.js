import React, {Component} from 'react';
import propTypes from 'prop-types';
import { getCanvasPosition } from './utils/formulas'
import Canvas from "./components/Canvas"
class App extends Component {
componentDidMount(){
  setInterval(() => {
    this.props.moveObjects(this.canvasMousePosition)
  })
}


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