import React from "react";
import "./Story.css";

function Story({ inputs, reset }) {
  return (
    <div className="Story">
      <p>
        There was a {inputs.color} {inputs.noun} who loved a {inputs.adjective}{" "}
        {inputs.noun2}
      </p>
      <button onClick={reset}>Restart</button>
    </div>
  );
}

export default Story;
