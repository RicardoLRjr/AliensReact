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
 trackMouse(event){
   this.canvasMousePosition = getCanvasPosition
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
  angle: propTypes.number.isRequired,
  trackMouse: propTypes.func.isRequired,
};

export default App;