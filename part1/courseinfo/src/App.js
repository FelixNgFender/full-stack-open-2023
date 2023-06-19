const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        id: 3,
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  const partItems = props.parts.map((part) => <Part part={part}></Part>);
  return <>{partItems}</>;
};

const Part = (props) => {
  const { id, name, exercises } = props.part;
  return (
    <p key={id}>
      {name} {exercises}
    </p>
  );
};

const Total = (props) => {
  let total = 0;
  props.parts.forEach((part) => {
    total += part.exercises;
  });
  return <p>Number of exercises {total}</p>;
};

export default App;
