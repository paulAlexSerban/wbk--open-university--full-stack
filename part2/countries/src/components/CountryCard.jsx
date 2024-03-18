const CountryCard = ({ country }) => {
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
        </div>
    );
};

export default CountryCard;
