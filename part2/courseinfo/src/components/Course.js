const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h2>{props.course}</h2>;
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
  const total = props.parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};

export default Course;
