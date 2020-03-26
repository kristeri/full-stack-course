import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h3>{course}</h3>;
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

export default Course;
