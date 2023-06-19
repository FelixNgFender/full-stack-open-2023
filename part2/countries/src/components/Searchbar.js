const Searchbar = ({ query, setQuery, countries, setSelectedCountries }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    });
    setSelectedCountries(selectedCountries);
    setQuery("");
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      find countries <input value={query} onChange={handleQueryChange} />
    </form>
  );
};

export default Searchbar;
