import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getCanvasPosition } from './utils/formulas'
import Canvas from "./components/Canvas"
class App extends Component {
componentDidMount(){
  const self = this
  setInterval(() => {
    self.props.moveObjects(self.canvasMousePosition)
  }, 10)
}
 trackMouse(event){
   this.canvasMousePosition = getCanvasPosition(event)
 }

  render() {
    return (
      <div className="App">
        <Canvas
        angle={this.props.angle}
        trackMouse={event => (this.trackMouse(event))}/>
      </div>
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  trackMouse: PropTypes.func.isRequired,
};

export default App;