const cron = require('node-cron');
const fs = require('fs')
const { Parser } = require('json2csv');
const tableScraper = require('tabletojson')
const url = "https://www.worldometers.info/coronavirus/";
(() => {
    cron.schedule('*/59 * * * *', () => {
        tableScraper.Tabletojson.convertUrl(url, { headings: ['countryName', 'totalCases', 'newCases', 'totalDeaths', 'newDeaths', 'totalRecovered', 'activeCases', 'seriousCases', 'casesPerM'] }, (d) => {
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(d[0]);
            fs.writeFileSync('./latestCoronaData/apiV2data.csv', csv)
            console.log(d[0])
        })

    })
})();