const tableScraper = require('tabletojson');
const getdata = (s) => {
    tableScraper.Tabletojson.convertUrl('https://www.worldometers.info/coronavirus/', (d) => {
        s(d)
    })
}
module.exports = getdata
