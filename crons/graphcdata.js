const fetch = require("node-fetch");
const fs = require("fs");
const cron = require('node-cron');
// console.trace()

// cron.schedule("*/15 * * * *", () => {
// console.trace();
const arrData = async(a) => {
    const url = "https://pomber.github.io/covid19/timeseries.json"
    console.log(url)

    await fetch(url)
        .then(res => res.json()).then(data => a(data)).catch(e => console.log("graphcdata error" + e))
}
arrData((b) => {
        fs.writeFileSync('./latestCoronaData/graphcdata.json', JSON.stringify(b))
    })
    // })