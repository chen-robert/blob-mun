const initialState = {
  delegates: ["Bob", "Joe", "Samuel", "Johns"],
  present: {},
  comitteeName: "Blah",
  sessionName: "Roll Call",
  collapsed: true
  
};
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
      return {...state, collapsed: !state.collapsed};
    case "PRESENT_STATUS":
      return {...state, 
        present: {...state.present, 
          [action.name]: action.status
        }
      }
    case "SET_SESSION":
      return {...state, sessionName: action.session};
    default:
      return state;
  }
};

export default reducer;
