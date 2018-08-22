import applyToState, {rooms} from "./applyToState";
import uuid from "utils/uuid";

const initialState = {
  generic: {
    id: uuid.generate(),
    delegates: [],
    present: {},
    committeeName: "Blob Mun",
    sessionName: "Roll Call",
    collapsed: false,
    speakingStats: {},
    genericRoom: {
      timer: 0,
      speakingTimer: 0,
      paused: true,
      speakingTotal: 1 * 60,
      total: 10 * 60,
      currentSpeaker: "",
      topic: "",
      speakers: []
    }
  },
  allStates: {}
};
for(var i = 0; i < 10; i++){
  const ret = {};
  rooms.forEach((room) => ret[room] = 10 ** Math.random());
  initialState.generic.speakingStats["Bob" + i] = ret;
}
rooms.forEach((name) => {
  initialState.generic[name] = {...initialState.generic.genericRoom}
});
initialState.allStates[initialState.generic.id] = {...initialState.generic};

const reducer = (state = initialState, action) => {
  if(action.type === "LOAD_SERVER_STATE"){
    return action.data;
  }
  //Required an id for all actions
  if(action.id === undefined)return state;
  
  const newState = applyToState(state.allStates[action.id], action);
  newState.delegates.sort((a, b) => a.toLowerCase() > b.toLowerCase());
  
  return {...state, 
    allStates: {...state.allStates,    
      [action.id]: newState
    }
  }
};


export default reducer;
