const request = require("request")
const fs = require("fs")
const cron = require('node-cron');
// console.trace()

cron.schedule("*/10 * * * *", () => {
    // console.trace();
    let urls = ['https://raw.githubusercontent.com/amcharts/covid-charts/master/data/json/total.json', 'https://raw.githubusercontent.com/amcharts/covid-charts/master/data/json/total_timeline.json', 'https://raw.githubusercontent.com/amcharts/covid-charts/master/data/json/world.json', 'https://raw.githubusercontent.com/amcharts/covid-charts/master/data/json/world_timeline.json']
    let files = ['./public/maps/data/json/total.json', './public/maps/data/json/total_timeline.json', './public/maps/data/json/world.json', './public/maps/data/json/world_timeline.json']
    const arrData = async(a) => {
        for (i = 0; i < urls.length; i++) {
            let url = urls[i]
            console.log(url)
            let file = files[i]
            request({ url, json: true }, (e, r, b) => {
                fs.writeFileSync(file, JSON.stringify(b))
                console.log('downloaded' + i)
            })
        }

    };


    arrData((b) => {
        // console.trace()
        fs.writeFileSync('./latestCoronaData/rawRssData.json', JSON.stringify(b))
    })

})