const initialState = {
  delegates: [],
  comitteeName: "Blah",
  sessionName: "Derp",
  collapsed: true
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DELEGATE":
      
      return {...state, 
        delegates: [...delegates, action.name]
      };
    case "TOGGLE_COLLAPSE":
      return {...state, collapsed: !state.collapsed};
    default:
      return state;
  }
};

export default reducer;
