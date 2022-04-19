import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import AddQuiz from "../pages/addQuiz/AddQuiz";

const mockStore = configureMockStore([]);

const authReducer = {
  questions: {}
}

afterEach(cleanup);

test("Button: renders Correctly", () => {
  const { getByTestId, getByRole } = screen;
  const store = mockStore({
    auth: authReducer
  });
  render(
    <Provider store={store}>
      <AddQuiz />
    </Provider>
  );
  const buttonContainer = getByTestId("button-container");
  const customButton = getByRole("button", {exact: 'Add Question'});
  expect(customButton.textContent).toBe("Add Question");
  expect(buttonContainer).toContainElement(customButton);
});