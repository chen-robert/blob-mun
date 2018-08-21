export const addDelegate = (name, id) => {
  name = name.trim();
  return {
    type: "ADD_DELEGATE",
    name,
    id
  }
}

export const setPresent = (name, status, id) => {
  return {
    type: "PRESENT_STATUS",
    name,
    status,
    id    
  }
}

export const toggleCollapse = (value, id) => {
  return {
    type: "TOGGLE_COLLAPSE",
    value,
    id
  }
}
export const setSession = (session, id) => {
  return {
    type: "SET_SESSION",
    session,
    id
  }
}

export const changeSessionData = (name, delta, id) => {
  return {
    type: "CHANGE_SESS",
    name,
    delta,
    id
  }
}

export const updateItem = (item, delta, id) => {
  return {
    type: "UPDATE_ITEM",
    item,
    delta,
    id
  }
}

export const removeDelegate = (name, id) => {
  return {
    type: "REMOVE_DELEGATE",
    name,
    id
  }
}

export const setCommitteeName = (name, id) => {
  return {
    type: "SET_COMMITTEE_NAME",
    name,
    id
  }
}

export const clearSpeakingData = (id) => {
  return {
    type: "CLEAR_SPEAKING_DATA",
    id
  }
}