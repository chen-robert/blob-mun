const initialState = {
  delegates: ["Bob", "Joe", "Samuel", "Johns"],
  present: {},
  comitteeName: "Blob Mun",
  sessionName: "Motions",
  collapsed: true,
  moderated: {
    timer: 0,
    speakingTimer: 0,
    paused: true,
    speakingTotal: 1 * 60,
    total: 10 * 60,
    currentSpeaker: "Bob",
    topic: ""
  }
};
//Use the same initial state data
initialState.unmoderated = {...initialState.moderated};

for(var i = 0; i < 26; i++){
  initialState.delegates.push("Bob" + i)
}
initialState.delegates.forEach((name) => {
  initialState.present[name] = "PRESENT";
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DELEGATE":
      
      return {...state, 
        delegates: [...delegates, action.name]
      };
    case "TOGGLE_COLLAPSE":
      return {...state, 
      collapsed: action.value !== undefined? action.value: !state.collapsed};
    case "PRESENT_STATUS":
      return {...state, 
        present: {...state.present, 
          [action.name]: action.status
        }
      }
    case "SET_SESSION":
      return {...state, sessionName: action.session};
    case "CHANGE_SESS":
      const newSessData = Object.assign({...state[action.name]}, action.delta);
      return {...state, [action.name]: newSessData};
    default:
      return state;
  }
};

export default reducer;
