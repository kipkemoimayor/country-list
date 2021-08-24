async function fetchCountries() {
    const location = await fetch(`https://restcountries.eu/rest/v2/all`)
        .then((response) => response.json()).catch(e => e);
    return location;
}

module.exports = fetchCountries;
