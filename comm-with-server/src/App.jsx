import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";


function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div className="App">
      <h1>Countries Lists</h1>

      <input
        type="text"
        placeholder="Search Countries"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredCountries.map((country, idx) => (
        <CountryDetail key={idx} {...country} />
      ))}
    </div>
  );
}

const CountryDetail = (props) => {
  const { name, flag, capital, population } = props;

  return (
    <p>
      <h3>{name}</h3>

      <div>
        <img src={flag} alt={name} style={{ width: "4rem", height: "4rem" }} />
      </div>
      <div>capital: {capital}</div>
      <div>Population: {population}</div>

    </p>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App