const cron = require('node-cron');
const fs = require('fs')
const { Parser } = require('json2csv');
const tableScraper = require('tabletojson')
const url = "https://www.worldometers.info/coronavirus/";
(() => {
    cron.schedule('0 */45 * * * *', () => {
        tableScraper.Tabletojson.convertUrl(url, { headings: ['countryName', 'totalCases', 'newCases', 'totalDeaths', 'newDeaths', 'totalRecovered', 'activeCases', 'seriousCases', 'casesPerM'] }, (d) => {
            const json2csvParser = new Parser();
            const maind = json2csvParser.parse(d[0]);
            const totalObj = d[0].filter(o => { return o.countryName == "Total:"; })[0];
            const countryListN = d[0].map((v) => {
                return v.countryName
            });
            const countryList = JSON.stringify(countryListN.sort((a, b) => {
                return a.localeCompare(b)
            }))
            fs.writeFileSync('./latestCoronaData/apiV2data.csv', maind)
            fs.writeFileSync('./latestCoronaData/totalObj.json', JSON.stringify(totalObj))
            fs.writeFileSync('./latestCoronaData/affectedCountryList.json', countryList)

            console.log('apiv2data updated')
        })

    })
})();