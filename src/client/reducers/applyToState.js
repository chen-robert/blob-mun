import SpeakingStats from "./SpeakingStats";

export const rooms = ["moderated", "unmoderated", "primarySpeakers", "secondarySpeakers", "singleSpeaker"];

const speakingStats = new SpeakingStats(rooms);

const applyToState = (state, action) => {
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
      let delta = action.delta;
      let newSpeakingStats = state.speakingStats;
      switch(action.delta.type){
        case "UPDATE_TIMER":
          delta = {
            timer: state[action.name].timer + action.delta.granularity,
            speakingTimer: state[action.name].speakingTimer + action.delta.granularity
          }
          
          const currentRoom = state[action.name];
          newSpeakingStats = speakingStats.applyDelta(state.speakingStats, 
            currentRoom.currentSpeaker, action.name, action.delta.granularity);
          break;
      }
      const newSessData = Object.assign({}, state[action.name], delta);
      return {...state, [action.name]: newSessData, speakingStats: newSpeakingStats};
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
    case "SET_COMMITTEE_NAME":
      return {...state,
        committeeName: action.name
      };
    case "CLEAR_SPEAKING_DATA":
      return {...state,
        speakingStats: {}
      }
    default:
      return state;
  }
}

export default applyToState;