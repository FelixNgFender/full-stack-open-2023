import { useState } from "react";

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = (type) => {
    switch (type) {
      case "good":
        return () =>
          setFeedback({
            ...feedback,
            good: feedback.good + 1,
          });
      case "neutral":
        return () =>
          setFeedback({
            ...feedback,
            neutral: feedback.neutral + 1,
          });
      case "bad":
        return () =>
          setFeedback({
            ...feedback,
            bad: feedback.bad + 1,
          });
      default:
        break;
    }
  };

  return (
    <main>
      <div>
        <h1>give feedback</h1>
        <Button type="good" handleFeedback={handleFeedback} />
        <Button type="neutral" handleFeedback={handleFeedback} />
        <Button type="bad" handleFeedback={handleFeedback} />
      </div>
      <Statictis feedback={feedback} />
    </main>
  );
};

const Button = ({ type, handleFeedback }) => (
  <button onClick={handleFeedback(type)}>{type}</button>
);

const Statictis = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(2);
  const positive = ((good / total) * 100).toFixed(2);
  return total === 0 ? (
    <p>No feedback given</p>
  ) : (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export default App;
