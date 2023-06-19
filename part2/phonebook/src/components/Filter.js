const Filter = ({ query, setQuery }) => {
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <p>
      filter show with
      <input onChange={handleQueryChange} value={query} />
    </p>
  );
};

export default Filter;
