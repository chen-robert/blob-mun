const initialState = {
  delegates: ["Democratic Republic Of Congo", "Joe", "Samuel", "Johns"],
  present: {},
  comitteeName: "Blob Mun",
  sessionName: "Roll Call",
  collapsed: true,
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
};

const rooms = ["moderated", "unmoderated", "primarySpeakers", "secondarySpeakers"];
rooms.forEach((name) => {
  initialState[name] = {...initialState.genericRoom}
});

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
        delegates: [...state.delegates, action.name]
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
      const newSessData = Object.assign({}, state[action.name], action.delta);
      return {...state, [action.name]: newSessData};
    case "UPDATE_ITEM":
      let ret = state;
      rooms.forEach((room) => {
        const index = state[room].speakers.indexOf(action.item);
        if(index !== -1){
          const speakers = state[room].speakers;
          const newItem = Object.assign({}, speakers[index], action.delta);
          
          let newList;
          
          if(action.delta === null){
            newList = [...speakers];
            newList.splice(index, 1);
          }else{
            newList = [...speakers.slice(0, index), newItem, ...speakers.slice(index + 1)];
          }
          const newState = {...state,
            [room]: {...state[room],
              speakers: newList,
            }
          }
          ret = newState;
        }
      });
      return ret;
    case "REMOVE_DELEGATE":
      
      const newList = [...state.delegates];
      const index = newList.indexOf(action.name);
      
      if(index >= 0)newList.splice(index, 1);
      
      return {...state, delegates: newList};
    default:
      return state;
  }
};

export default reducer;
