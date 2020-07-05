import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("should render", function () {
  // smoke test
  render(<Carousel />);
});

it("matches snapshot", function () {
  // snapshot test
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("should return to the previous image when clicking left arrow", function () {
  const { queryByAltText, queryByTestId } = render(<Carousel />);

  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
});

it("should hide arrows appropriately", function () {
  const { queryByTestId } = render(<Carousel />);
  let rightArrow = queryByTestId("right-arrow");
  let leftArrow = queryByTestId("left-arrow");

  expect(leftArrow).toBe(null);
  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);
  leftArrow = queryByTestId("left-arrow");

  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);

  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
});
