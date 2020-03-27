const request = require("request")
const fs = require("fs")
const cron = require('node-cron');
// console.trace()

cron.schedule("*/10 * * * *", () => {
    // console.trace();
    const arrData = (a) => {
        const url = "https://pomber.github.io/covid19/timeseries.json"
        console.log(url)
        request({ url, json: true }, (e, r, b) => {
            a(b)
        })
    }

    arrData((b) => {
        fs.writeFileSync('./latestCoronaData/graphcdata.json', JSON.stringify(b))
    })

})