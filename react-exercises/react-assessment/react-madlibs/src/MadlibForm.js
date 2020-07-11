import React, { useState } from "react";
import MadlibFormInput from "./MadlibFormInput";
import "./MadlibsForm.css";

function MadlibForm({ createStory, fillForm }) {
  const parts = ["noun", "noun2", "adjective", "color"];
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fillForm();
    createStory(inputs);
    setInputs([]);
  };

  return (
    <form id="MadlibsForm" onSubmit={(e) => handleSubmit(e)}>
      {parts.map((part) => (
        <MadlibFormInput part={part} onChange={(e) => handleChange(e)} />
      ))}
      <button>Get Story</button>
    </form>
  );
}

export default MadlibForm;
