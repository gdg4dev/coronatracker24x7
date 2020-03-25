import covidFetcher from 'simple-covid19-json-fetcher'
(async() => {

    // Attempt to fetch today's data - fallbacks to previous day on 404
    const covidCountries = await corona(new Date())
    console.log(covidCountries)
})()