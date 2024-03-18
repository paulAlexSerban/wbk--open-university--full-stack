import { useEffect, useState } from 'react';
import Notification from './components/Notification';
import Filter from './components/Filter';
import CountryCard from './components/CountryCard';
const App = (props) => {
    const [countries, setCountries] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const countriesToShow = filter
        ? countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
        : countries;

    if (countries === null) {
        return null;
    }
    return (
        <div>
            <h1>Countries</h1>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            {countriesToShow.length > 10 ? <Notification message="Too many matches, specify another filter" /> : null}
            {countriesToShow.length <= 10 && countriesToShow.length > 1 ? (
                <ul>
                    {countriesToShow.map((country, index) => (
                        <li key={index}>{country.name.common}
                            <button onClick={() => setFilter(country.name.common)}>show</button>
                        </li>
                    ))}
                </ul>
            ) : null}
            {countriesToShow.length === 1 ? <CountryCard country={countriesToShow[0]} /> : null}
        </div>
    );
};

export default App;
