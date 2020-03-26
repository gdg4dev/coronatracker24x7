const request = require("request")
const fs = require("fs")
const cron = require('node-cron');
// console.trace()

cron.schedule("*/30 * * * *", () => {
    // console.trace();
    let urls = ['https://raw.githubusercontent.com/amcharts/covid-charts/master/data/js/total.js', 'https://raw.githubusercontent.com/amcharts/covid-charts/master/data/js/total_timeline.js', 'https://raw.githubusercontent.com/amcharts/covid-charts/master/data/js/world.js', 'https://raw.githubusercontent.com/amcharts/covid-charts/master/data/js/world_timeline.js']
    let files = ['./public/maps/data/js/total.js', './public/maps/data/js/total_timeline.js', './public/maps/data/js/world.js', './public/maps/data/js/world_timeline.js']
    const arrData = async(a) => {
        for (i = 0; i < urls.length; i++) {
            let url = urls[i]
            console.log(url)
            let file = files[i]
            request({ url, json: true }, (e, r, b) => {
                fs.writeFileSync(file, b)
                console.log('downloaded' + i)
            })
        }

    };


    arrData((b) => {
        // console.trace()
        fs.writeFileSync('./latestCoronaData/rawRssData.json', JSON.stringify(b))
    })

})