import applyToState from "./applyToState";

const initialState = {
  generic: {
    id: "LOL",
    delegates: [],
    present: {},
    committeeName: "Blob Mun",
    sessionName: "Roll Call",
    collapsed: false,
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

const rooms = ["moderated", "unmoderated", "primarySpeakers", "secondarySpeakers", "singleSpeaker"];
rooms.forEach((name) => {
  initialState.generic[name] = {...initialState.generic.genericRoom}
});

initialState.allStates[initialState.generic.id] = {...initialState.generic};
const reducer = (state = initialState, action) => {
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
