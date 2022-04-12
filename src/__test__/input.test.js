import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

import Input from "../components/input/Input";

afterEach(cleanup);

test("Input: renders Correctly", () => {
  const { getByTestId } = render(<Input />);
  const inputContainer = getByTestId("input-container");
  const customInput = getByTestId("input");
  expect(inputContainer).toContainElement(customInput);
});

test("Input: Change Input Value", () => {
  const { getByTestId } = render(<Input />);
  const customInput = getByTestId("input");
  fireEvent.change(customInput, {
    target: {
      value: "ddd",
    },
  });
  expect(customInput.value).toBe("ddd");
});

test("Input: match snapshot", () => {
  // const snapshot = renderer.create(<Input />).toJSON();
  const snapshot = render(<Input />);
  expect(snapshot).toMatchSnapshot();
});
