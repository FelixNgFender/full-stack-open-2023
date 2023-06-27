import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "http://localhost:3000",
    likes: 0,
    user: {
      name: "Test User",
    },
  };
  const currentUser = {
    name: "Test User",
  };
  const component = render(<Blog currentUser={currentUser} blog={blog} />);
  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  expect(component.container).toHaveTextContent("Test Author");
  expect(component.container).not.toHaveTextContent("http://localhost:3000");
  expect(component.container).not.toHaveTextContent("likes 0");
});
