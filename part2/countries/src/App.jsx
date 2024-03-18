import { useEffect, useState } from 'react';
import Notification from './components/Notification';
import axios from 'axios';
import Filter from './components/Filter';
import CountryCard from './components/CountryCard';

// REST_COUNTRIES_URL: 'https://studies.cs.helsinki.fi/restcountries/api'
// OPEN_WEATHER_URL: 'https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid=e{API_KEY}'

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

console.log('OPEN_WEATHER_API_KEY', OPEN_WEATHER_API_KEY);
const App = (props) => {
    const [countries, setCountries] = useState(null);
    const [filter, setFilter] = useState('');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
            setCountries(response.data);
        });
    }, [filter]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const countriesToShow = filter
        ? countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
        : countries;



    useEffect(() => {
        if (countriesToShow && countriesToShow.length === 1) {
            const country = countriesToShow[0];
            const city = country.capital[0];
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)
                .then((response) => {
                    setWeather(response.data);
                });
        }
    }, [countries]);

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
                        <li key={index}>
                            {country.name.common}
                            <button onClick={() => setFilter(country.name.common)}>show</button>
                        </li>
                    ))}
                </ul>
            ) : null}
            {countriesToShow.length === 1 ? <CountryCard country={countriesToShow[0]} weather={weather}
             /> : null}
        </div>
    );
};

export default App;
