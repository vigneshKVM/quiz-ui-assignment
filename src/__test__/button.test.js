import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Button from "../components/button/Button";

const mockStore = configureMockStore([]);

afterEach(cleanup);

test("Button: renders Correctly", () => {
  const { getByTestId } = render(
    <Button onClick={() => console.log("clicked")}>save</Button>
  );
  const buttonContainer = getByTestId("button-container");
  const customButton = getByTestId("button");
  expect(customButton.textContent).toBe("save");
  expect(buttonContainer).toContainElement(customButton);
});

// test("Button: match snapshot", () => {
//   const store = mockStore();
//   const snapshot = renderer
//     .create(
//       <Provider store={store}>
//         <Button>save</Button>
//       </Provider>
//     )
//     .toJSON();
//   expect(snapshot).toMatchSnapshot();
// });
