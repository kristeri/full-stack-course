import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ content }) => {
  return (
    <>
      {content.map(item => {
        return (
          <p>
            {item.part} {item.exercises}
          </p>
        );
      })}
    </>
  );
};

const Total = ({ content }) => {
  return <p>Number of exercises {content.reduce((prev, next) => prev + next.exercises, 0)}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        content={[
          { part: part1, exercises: exercises1 },
          { part: part2, exercises: exercises2 },
          { part: part3, exercises: exercises3 }
        ]}
      />
      <Total
        content={[
          { part: part1, exercises: exercises1 },
          { part: part2, exercises: exercises2 },
          { part: part3, exercises: exercises3 }
        ]}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
