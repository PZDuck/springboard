const DEFAULT_STATE = {
  face: "┐( ˘_˘ )┌",
  color: "",
};

function moodReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case "MOOD_HAPPY":
      return { ...state, face: action.payload, color: "#3cdb02" };
    case "MOOD_SAD":
      return { ...state, face: action.payload, color: "#59c0e3" };
    case "MOOD_ANGRY":
      return { ...state, face: action.payload, color: "#f35c5c" };
    case "MOOD_CONFUSED":
      return { ...state, face: action.payload, color: "#c762fc" };
    default:
      return state;
  }
}
