import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "../components/button/Button";


afterEach(cleanup);

test("Button: renders Correctly", () => {
  const { getByTestId, getByRole } = screen;
  render(
    <Button onClick={() => console.log("clicked")}>save</Button>
  );
  const buttonContainer = getByTestId("button-container");
  const customButton = getByRole("button", {exact: 'save'});
  expect(customButton.textContent).toBe("save");
  expect(buttonContainer).toContainElement(customButton);
});
