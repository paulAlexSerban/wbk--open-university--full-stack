const CountryCard = ({ country, weather }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area} km²</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt="flag" width="300" />
            {weather ? (
                <div>
                    <h3>Weather in {country.capital[0]}</h3>
                    <div>
                        <strong>temperature:</strong> {weather.main.temp} Celsius
                    </div>
                    <div>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt="weather icon" width="100"
                        />
                    </div>
                    <div>
                        <strong>wind:</strong> {weather.wind.speed} m/s
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CountryCard;
