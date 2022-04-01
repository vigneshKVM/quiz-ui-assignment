import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

afterEach(cleanup);

test("Button: renders Correctly", () => {
  const { getByTestId } = render(<Button onClick={() => console.log('clicked')}>save</Button>);
  const buttonContainer = getByTestId("button-container");
  const customButton = getByTestId("button");
  expect(customButton.textContent).toBe("save");
  expect(buttonContainer).toContainElement(customButton);
});

test("Button: match snapshot", () => {
  const snapshot = render(<Button>save</Button>);
  expect(snapshot).toMatchSnapshot();
});
