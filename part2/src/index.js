import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ item }) => {
  return (
    <p>
      {item.name} {item.exercises}
    </p>
  );
};

const Content = ({ content }) => {
  return (
    <div>
      {content.map(item => {
        return <Part item={item} />;
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  return <strong>Total of exercises {parts.reduce((prev, next) => prev + next.exercises, 0)}</strong>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      }
    ]
  };
  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
