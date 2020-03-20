const cron = require('node-cron');
const fs = require('fs')
const { Parser } = require('json2csv');
const tableScraper = require('tabletojson')
const url = "https://www.worldometers.info/coronavirus/";
(() => {
    cron.schedule('*/1 * * * *', () => {
        tableScraper.Tabletojson.convertUrl(url, { headings: ['countryName', 'totalCases', 'newCases', 'totalDeaths', 'newDeaths', 'totalRecovered', 'activeCases', 'seriousCases', 'casesPerM'] }, (d) => {
            const json2csvParser = new Parser();
            const maind = json2csvParser.parse(d[0]);
            const totalObj = d[0].filter(o => { return o.countryName == "Total:"; })[0];
            const countryList = d[0].map((v) => {
                return v.countryName
            });
            console.log(totalObj)
            console.log(JSON.stringify(countryList))
            console.log(d[0].map((v) => {
                return v.countryName
            }))
            fs.writeFileSync('./latestCoronaData/apiV2data.csv', maind)
            fs.writeFileSync('./latestCoronaData/totalObj.json', JSON.stringify(totalObj))

            console.log('apiv2data updated')
        })

    })
})();