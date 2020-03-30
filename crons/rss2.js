const request = require("request")
const fs = require("fs")
const cron = require('node-cron');
// console.trace()

// cron.schedule("*/15 * * * *", () => {
// console.trace();
const arrData = (a) => {
    let arr = []
    for (let i = 1; i < 6; i++) {
        // console.trace()
        const keys = ['8879c8a75459419f81e646f401bfb4cb', 'e6c5807fd5f54b5b89273da886734229', '73aa6b379e6f45fdbd810d15c7660ee0', '847e4c7b155b40afb38da5535f656cf7', '830bc5d8c03a4b29a8f74077c0a3d261']
        const url = "http://newsapi.org/v2/top-headlines?q=coronavirus&apiKey=" + keys[i - 1] + "&language=en&page=" + i
        console.log(url)
        request({ url, json: true }, (e, r, b) => {
            try {
                arr.push(b.articles)
                a(arr)
            } catch (e) {
                console.log('rss2 error')
            }
        })
    }
};


arrData((b) => {
    // console.trace()
    fs.writeFileSync('./latestCoronaData/rawRssData.json', JSON.stringify(b))
})

// })