const request = require("request")
const fs = require("fs")
const cron = require('node-cron');

cron.schedule("* */30 * * * *", () => {
    const arrData = async (a) => {
        const rand = (min, max) => {
            return Math.floor(
                Math.random() * (max - min) + min
            )
        }
        let arr = []
        for (let i = 1; i <= 5; i++) {
            var rNumber = rand(0, 4)
            const keys = ['8879c8a75459419f81e646f401bfb4cb', 'e6c5807fd5f54b5b89273da886734229', '73aa6b379e6f45fdbd810d15c7660ee0', '847e4c7b155b40afb38da5535f656cf7', '830bc5d8c03a4b29a8f74077c0a3d261']
            const url = "http://newsapi.org/v2/everything?q=coronavirus&apiKey=" + keys[rNumber] + "&language=en&page=" + i
            console.log(url)
            await request({ url, json: true }, async (e, r, b) => {
                await arr.push(b.articles)
                a(arr)
            })

        }

    }
    const bd = arrData((b) => {
        fs.writeFileSync('./latestCoronaData/rawRssData.json', JSON.stringify(b))
    })
})