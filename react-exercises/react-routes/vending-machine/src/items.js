import React from "react";
import Snack from "./Snacks";
import sodaIcon from "./static/soda-can.png";
import sardinesIcon from "./static/tuna.png";
import chipsIcon from "./static/snack.png";
import chocolateIcon from "./static/chocolate.png";

const ITEMS = {
  "101": {
    name: "soda",
    component: (
      <Snack
        name="Soda"
        info={{ weigth: "14.2 g", cal: "150", expire: "12/12/2022" }}
      />
    ),
    icon: sodaIcon,
  },
  "102": {
    name: "chips",
    component: (
      <Snack
        name="Chips"
        info={{ weigth: "10 g", cal: "152", expire: "04/06/2021" }}
      />
    ),
    icon: chipsIcon,
  },
  "103": {
    name: "sardines",
    component: (
      <Snack
        name="Sardines"
        info={{ weigth: "15 g", cal: "25", expire: "12/25/2022" }}
      />
    ),
    icon: sardinesIcon,
  },
  "104": {
    name: "chocolate",
    component: (
      <Snack
        name="Chocolate"
        info={{ weigth: "44 g", cal: "500", expire: "05/24/2022" }}
      />
    ),
    icon: chocolateIcon,
  },
};
export default ITEMS;
