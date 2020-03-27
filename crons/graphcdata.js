const fetch = require("node-fetch");
const fs = require("fs");
const cron = require('node-cron');
// console.trace()

cron.schedule("*/10 * * * *", () => {
    // console.trace();
    const arrData = (a) => {
        const url = "https://pomber.github.io/covid19/timeseries.json"
        console.log(url)

        fetch(url)
            .then(res => res.json())
    }
    arrData((b) => {
        fs.writeFileSync('./latestCoronaData/graphcdata.json', JSON.stringify(b))
    })
})