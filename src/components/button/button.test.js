import React from "react";
import RenderDom from "react-dom";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  RenderDom.render(<Button></Button>, div);
});

it("renders Button Correctly", () => {
  const { getByTestId } = render(<Button>save</Button>);
  const buttonContainer = getByTestId("button-container");
  const customButton = getByTestId("button");
  expect(customButton).toHaveTextContent("save");
  expect(buttonContainer).toContainElement(customButton);
});

it("match snapshot", () => {
  const snapshot = render(<Button>save</Button>);
  expect(snapshot).toMatchSnapshot();
});
