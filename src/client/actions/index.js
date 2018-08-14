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

export const toggleCollapse = (value) => {
  return {
    type: "TOGGLE_COLLAPSE",
    value
  }
}
export const setSession = (session) => {
  return {
    type: "SET_SESSION",
    session
  }
}

export const changeSessionData = (name, delta) => {
  return {
    type: "CHANGE_SESS",
    name,
    delta
  }
}

export const updateItem = (item, delta) => {
  return {
    type: "UPDATE_ITEM",
    item,
    delta
  }
}