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
  window.onresize = () => {
    const cnv = document.getElementById('aliens-go-home-canvas');
    cnv.style.width = `${window.innerWidth}px`;
    cnv.style.height = `${window.innerHeight}px`;
  };
  window.onresize();
}
 trackMouse(event){
   this.canvasMousePosition = getCanvasPosition(event)
 }

 

  render() {
    return (
      <div className="App">
        <Canvas
        angle={this.props.angle}
        gameState={this.props.gameState}
       startGame={this.props.startGame}
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