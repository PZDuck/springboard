const App = () => {
  return (
    <div>
      <Tweet username="test" name="test name" tweet="my first tweet" />
      <Tweet username="test2" name="test name 2" tweet="aye aye" />
      <Tweet username="test3" name="test name 3" tweet="boody 'ell" />
    </div>
  );
};

const Tweet = (props) => {
  const date = new Date();
  return (
    <div>
      <span>@{props.username}</span>
      <span>{props.name}</span>
      <span>{date.toUTCString()}</span>
      <p>{props.tweet}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
