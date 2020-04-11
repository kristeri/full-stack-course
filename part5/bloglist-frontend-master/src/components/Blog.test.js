import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const user = {
  username: "username",
  name: "Name",
};

const blog = {
  title: "Title",
  author: "Author",
  url: "Url",
  user: user,
};

const mockHandler = jest.fn();

test("renders title and author", () => {
  const component = render(<Blog blog={blog} blogs={[]} user={user} />);
  expect(component.container).toHaveTextContent("Title");
  expect(component.container).toHaveTextContent("Author");
  expect(component.container).not.toHaveTextContent("Url");
});

test("after clicking the button, url and likes are displayed", () => {
  const component = render(<Blog blog={blog} blogs={[]} user={user} />);
  const button = component.getByText("View");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("Url");
  expect(component.container).toHaveTextContent("Likes");
});

test("if the like button is clicked twice, the event handler the component received as props is called twice", () => {
  const component = render(<Blog blog={blog} blogs={[]} setBlogs={mockHandler} user={user} />);
  const button = component.getByText("View");
  fireEvent.click(button);

  const likeButton = component.getByText("Like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
