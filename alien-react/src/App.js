import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Auth0 from 'auth0-web'
import { getCanvasPosition } from "./utils/formulas";
import Canvas from "./components/Canvas";

 Auth0.configure({
    domain: 'dev-8uxf2tze.us.auth0.com',
    clientID: 'iFxS4bdU4fqbXWXeiD5fRr1jchYrZ749',
    redirectUri: 'http://localhost:3000/',
    responseType: 'token id_token',
    scope: 'openid profile manage:points',
  });
class App extends Component {
  componentDidMount() {
    const self = this;
    Auth0.handleAuthCallback();
    Auth0.subscribe((auth) => {
      console.log(auth);})
    setInterval(() => {
      self.props.moveObjects(self.canvasMousePosition);
    }, 10);
    window.onresize = () => {
      const cnv = document.getElementById("aliens-go-home-canvas");
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }
  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  

  render() {
    return (
      <div className="App">
        <Canvas
          angle={this.props.angle}
          gameState={this.props.gameState}
          startGame={this.props.startGame}
          trackMouse={(event) => this.trackMouse(event)}
        />
      </div>
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  trackMouse: PropTypes.func.isRequired,
  gameState: PropTypes.shape({
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    started: PropTypes.bool.isRequired,
  }).isRequired,
  flyingObjects: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default App;
