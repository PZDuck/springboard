const App = () => {
  return (
    <div>
      <Person age="18" name="jeff" hobbies="skiing,shooting,shouting" />
      <Person age="12" name="bob" hobbies="reading,fishing,killing" />
      <Person age="24" name="jack" hobbies="creating React components" />
    </div>
  );
};

const Person = (props) => {
  let vote = +props.age >= 18 ? <OverEighteen /> : <UnderEighteen />;
  let hobbies = [];

  for (let hobby of props.hobbies.split(",")) {
    hobbies.push(<Hobby key={hobby} hobby={hobby} />);
  }
  return (
    <div>
      <p>Learn some information about this person</p>
      <p>Hi, I am {props.name}!</p>
      {vote}
      <ul>
        Hobbies
        {hobbies}
      </ul>
    </div>
  );
};

const OverEighteen = (props) => <p>Please go vote!</p>;

const UnderEighteen = (props) => <p>You must be 18!</p>;

const Hobby = (props) => <li>{props.hobby}</li>;

ReactDOM.render(<App />, document.getElementById("root"));
