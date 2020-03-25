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
      <Part item={content[0]} />
      <Part item={content[1]} />
      <Part item={content[2]} />
    </div>
  );
};

const Total = ({ content }) => {
  return <p>Number of exercises {content.reduce((prev, next) => prev + next.exercises, 0)}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };
  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
