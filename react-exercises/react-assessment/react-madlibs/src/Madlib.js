import React, { useState } from "react";
import MadlibForm from "./MadlibForm";
import Story from "./Story";

function Madlib() {
  const [fillingForm, setFillingForm] = useState(true);
  const [inputs, setInputs] = useState({});

  const fillForm = () => {
    setFillingForm(!fillingForm);
  };

  const createStory = (inputs) => {
    setInputs(inputs);
  };

  const reset = () => {
    fillForm();
    setInputs({});
  };

  return (
    <div className="Madlib">
      {fillingForm ? (
        <MadlibForm createStory={createStory} fillForm={fillForm} />
      ) : (
        <Story inputs={inputs} reset={reset} />
      )}
    </div>
  );
}

export default Madlib;
