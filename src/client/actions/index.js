export const addDelegate = (name) => {
  return {
    type: "ADD_DELEGATE",
    name
  }
}

export const toggleCollapse = () => {
  return {
    type: "TOGGLE_COLLAPSE"
  }
}