export const addDelegate = (name) => {
  return {
    type: "ADD_DELEGATE",
    name
  }
}

export const setPresent = (name, status) => {
  return {
    type: "PRESENT_STATUS",
    name,
    status    
  }
}

export const toggleCollapse = () => {
  return {
    type: "TOGGLE_COLLAPSE"
  }
}
export const setSession = (session) => {
  return {
    type: "SET_SESSION",
    session
  }
}