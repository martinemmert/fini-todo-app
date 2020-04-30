import * as React from "react";
import { Pending } from "./index.stories";
import { render } from "@testing-library/react";

test("it should render the title", () => {
  const { getByText } = render(<Pending />);
  expect(getByText("Some pending Task")).toBeDefined();
});
