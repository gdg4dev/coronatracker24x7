const request = require("request")
const fs = require("fs")
const cron = require('node-cron');
// console.trace()

cron.schedule("*/30 * * * *", () => {
    // console.trace();
    const arrData = (a) => {
        let arr = []
        for (let i = 1; i < 6; i++) {
            // console.trace()
            const keys = ['8879c8a75459419f81e646f401bfb4cb', 'e6c5807fd5f54b5b89273da886734229', '73aa6b379e6f45fdbd810d15c7660ee0', '847e4c7b155b40afb38da5535f656cf7', '830bc5d8c03a4b29a8f74077c0a3d261']
            const url = "http://newsapi.org/v2/everything?q=coronavirus&apiKey=" + keys[i - 1] + "&language=en&page=" + i
            console.log(url)
            request({ url, json: true }, (e, r, b) => {
                arr.push(b.articles)
                a(arr)
            })
        }
    };

    console.log('2')
    arrData((b) => {
        // console.trace()
        fs.writeFileSync('./latestCoronaData/rawRssData.json', JSON.stringify(b))
        console.log('3')
    })

})