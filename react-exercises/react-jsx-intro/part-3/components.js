const App = () => {
  return (
    <div>
      <Person age={18} name="jeff" hobbies={["dancing", "singing"]} />
      <Person age={12} name="bob" hobbies={["eating", "beating", "stealing"]} />
      <Person age={24} name="jack" hobbies={["creating React components"]} />
    </div>
  );
};

const Person = (props) => {
  let vote = props.age >= 18 ? <OverEighteen /> : <UnderEighteen />;

  return (
    <div>
      <p>Learn some information about this person</p>
      <p>Hi, I am {props.name}!</p>
      {vote}
      <ul>
        Hobbies
        {props.hobbies.map((h) => (
          <li>{h}</li>
        ))}
      </ul>
    </div>
  );
};

const OverEighteen = (props) => <p>Please go vote!</p>;

const UnderEighteen = (props) => <p>You must be 18!</p>;

const Hobby = (props) => <li>{props.hobby}</li>;

ReactDOM.render(<App />, document.getElementById("root"));
