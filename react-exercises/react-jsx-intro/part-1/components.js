const App = () => {
  return (
    <div>
      <FirstComponent />
      <NamedComponent name="jeff" />
    </div>
  );
};

const FirstComponent = () => <h1>My very first component</h1>;

const NamedComponent = (props) => <p>My name is {props.name}</p>;

ReactDOM.render(<App />, document.getElementById("root"));
