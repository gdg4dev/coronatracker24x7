const tableScraper = require('tabletojson');
const getdata = (s) => {
    tableScraper.Tabletojson.convertUrl('https://www.worldometers.info/coronavirus/', { headings: ['countryName', 'totalCases', 'newCases', 'totalDeaths', 'newDeaths', 'totalRecovered', 'activeCases', 'seriousCases', 'casesPerM'] }, (d) => {
        s(d)
    })
}

// console.log(getdata((s) => {
//     console.log(s)
// }))
module.exports = getdata
