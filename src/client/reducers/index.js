import applyToState, {rooms} from "./applyToState";
import uuid from "utils/uuid";

const generateId = () => uuid.generate();
const generateState = (name) => {  
  const newState = {
    ...initialState.generic, 
    committeeName: name,
    id: generateId()
  }
  
  return newState;
}
const initialState = {
  generic: {
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
rooms.forEach((name) => {
  initialState.generic[name] = {...initialState.generic.genericRoom}
});

const newState = generateState("Blober Mun");
initialState.allStates[newState.id] = newState;

const reducer = (state = initialState, action) => {
  switch(action.type){
    case "LOAD_SERVER_STATE":
      return action.data;
    case "CREATE_NEW_STATE":
      const newState = generateState(action.name);
      
      return {...state,
        allStates: {...state.allStates,
          [newState.id]: newState          
        }
      }    
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
