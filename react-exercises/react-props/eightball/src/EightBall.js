import React, { useState } from "react";
import answers from "./answers";
import "./style.css";

function EightBall() {
  function getRandom() {
    const answer = answers[Math.floor(Math.random() * answers.length)];
    setAnswer(answer.msg);
    setColor(answer.color);

    // #1 Attempt

    // setCounter(prevState => {
    //   prevState['question'] += 1
    //   prevState[color] += 1
    // })

    // #2 Attempt
    // setCounter({
    //   ...counter,
    //   ["questions"]: counter["questions"] + 1,
    //   [color]: counter[color] + 1,
    // });
  }
  function reset() {
    setAnswer("Think of a Question");
    setColor("black");
    setCounter({
      questions: 0,
      green: 0,
      goldenrod: 0,
      red: 0,
    });
  }

  // #3 Attempt
  function updateCounter() {
    counter["questions"] += 1;
    counter[color] += 1;
    setCounter(counter);
  }

  const [answer, setAnswer] = useState("Think of a Question");
  const [color, setColor] = useState("black");
  const [counter, setCounter] = useState({
    questions: 0,
    green: 0,
    goldenrod: 0,
    red: 0,
  });

  return (
    <>
      <div
        className="eightBall"
        style={{ backgroundColor: color }}
        onClick={() => {
          getRandom();
          updateCounter();
        }}
      >
        <div className="eightBall-text">{answer}</div>
      </div>

      <button onClick={() => reset()}>Reset</button>
      <span>{`#Questions: ${counter.questions} | #Positive: ${counter.green} | #Negative: ${counter.red} | #Neutral: ${counter.goldenrod}`}</span>
    </>
  );
}

export default EightBall;
