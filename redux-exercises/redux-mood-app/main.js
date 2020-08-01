const store = Redux.createStore(moodReducer);
const face = document.querySelector(".face");
const body = document.querySelector("body");

face.innerHTML = store.getState().face;

document.addEventListener("click", function (e) {
  if (e.target.className === "btn") {
    switch (e.target.dataset.mood) {
      case "happy":
        store.dispatch({ type: "MOOD_HAPPY", payload: "٩(◕‿◕｡)۶" });
        break;
      case "sad":
        store.dispatch({ type: "MOOD_SAD", payload: "(ಥ﹏ಥ)" });
        break;
      case "angry":
        store.dispatch({ type: "MOOD_ANGRY", payload: "٩(ఠ益ఠ)۶" });
        break;
      case "confused":
        store.dispatch({ type: "MOOD_CONFUSED", payload: "ლ(ಠ_ಠ ლ)" });
        break;
    }
  }
  face.innerHTML = store.getState().face;
  body.style.backgroundColor = store.getState().color;
});
