import { MOVE_OBJECTS, START_GAME, startGame }  from "../actions"
import moveObjects from "./moveObjects"

  const initialGameState = {
    started: false,
    kills: 0,
    lives: 3
   };

const initialState = {
    angle: 45,
    gameState: initialGameState
  };
   
  function reducer(state = initialState, action) {
    switch (action.type) {
        case MOVE_OBJECTS:
        return moveObjects(state, action);
        case START_GAME:
          return startGame(state, initialGameState)
        default:
            return state;
  }
} 
  export default reducer;