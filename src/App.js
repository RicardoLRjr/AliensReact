import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Auth0 from "auth0-web"
import io from 'socket.io-client'
import { getCanvasPosition } from "./utils/formulas";
import Canvas from "./components/Canvas";

 Auth0.configure({
    domain: 'dev-8uxf2tze.us.auth0.com',
    clientID: 'iFxS4bdU4fqbXWXeiD5fRr1jchYrZ749',
    redirectUri: 'http://localhost:3000/',
    responseType: 'token id_token',
    scope: 'openid profile manage:points',
    audience: 'https://aliens-warzone.com.'
  });
class App extends Component {
  constructor(props) {
    super(props);
    this.shoot = this.shoot.bind(this);
  }

  componentDidMount() {
    const self = this;
    Auth0.handleAuthCallback();
    Auth0.subscribe((auth) => {
      if (!auth) return;

      const playerProfile = Auth0.getProfile();
      const currentPlayer = {
        id: playerProfile.sub,
        maxScore: 0,
        name: playerProfile.name,
        picture: playerProfile.picture
      }
      this.props.loggedIn(currentPlayer)
      const socket = io('http://localhost:3001', {
        query: `token=${Auth0.getAccessToken()}`,
      });

      let emitted = false;
      socket.on('players', (players) => {
        this.props.leaderboardLoaded(players);

        if (emitted) return;
        socket.emit('new-max-score', {
          id: playerProfile.sub,
          maxScore: 120,
          name: playerProfile.name,
          picture: playerProfile.picture,
        });
        emitted = true;
        setTimeout(() => {
          socket.emit('new-max-score', {
            id: playerProfile.sub,
            maxScore: 222,
            name: playerProfile.name,
            picture: playerProfile.picture,
          });
        }, 5000);
      });
    });

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

  shoot() {
    this.props.shoot(this.canvasMousePosition);
  }


  render() {
    return (
      <div className="App">
        <Canvas
           angle={this.props.angle}
           currentPlayer={this.props.currentPlayer}
           gameState={this.props.gameState}
           players={this.props.players}
           startGame={this.props.startGame}
           trackMouse={event => (this.trackMouse(event))}
           shoot={this.shoot}
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
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  leaderboardLoaded: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })),
  shoot: PropTypes.func.isRequired,
};

App.defaultProps = {
  currentPlayer: null,
  players: null,
};

export default App;
