import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";

describe("tests App", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<App testAction={() => {}} />);
    expect(getByText("Learn React")).toBeTruthy();
  });
});
