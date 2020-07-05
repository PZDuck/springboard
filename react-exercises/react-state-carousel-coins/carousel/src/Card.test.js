import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

it("should render", function () {
  // smoke test
  render(<Card />);
});

it("matches snapshot", function () {
  // snapshot test
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
