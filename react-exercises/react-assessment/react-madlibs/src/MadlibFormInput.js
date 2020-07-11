import React from "react";

function MadlibFormInput({ part, onChange }) {
  return (
    <>
      <input
        id={part}
        type="text"
        placeholder={part}
        onChange={onChange}
        required
      ></input>
    </>
  );
}

export default MadlibFormInput;
