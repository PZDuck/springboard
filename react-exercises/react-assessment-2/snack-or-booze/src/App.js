import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import AppContext from "./AppContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState({});

  // provide a function for API POST request
  const addItem = async (type, item) => {
    type === "snacks"
      ? await SnackOrBoozeApi.addSnack(item)
      : await SnackOrBoozeApi.addDrink(item);
  };

  useEffect(() => {
    async function getItems() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      let drinks = await SnackOrBoozeApi.getDrinks();
      setItems({ snacks, drinks });
      setIsLoading(false);
    }
    getItems();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <AppContext.Provider value={{ items, setItems }}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <main>
            <Switch>
              <Route exact path="/">
                <Home items={items} />
              </Route>
              <Route exact path="/snacks">
                <Menu
                  items={items.snacks}
                  addItem={addItem}
                  type="snacks"
                  title="Snacks"
                />
              </Route>
              <Route path="/snacks/:id">
                <MenuItem items={items.snacks} cantFind="/snacks" />
              </Route>
              <Route exact path="/drinks">
                <Menu
                  items={items.drinks}
                  addItem={addItem}
                  type="drinks"
                  title="Drinks"
                />
              </Route>
              <Route path="/drinks/:id">
                <MenuItem items={items.drinks} cantFind="/drinks" />
              </Route>
              <Route>
                <p>Hmmm. I can't seem to find what you want.</p>
              </Route>
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
