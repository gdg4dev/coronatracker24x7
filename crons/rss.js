const fs = require('fs')
const Parser = require('rss-parser');
const path = require('path')
const filePath = path.join("./latestCoronaData/rss.json");
const cron = require('node-cron')

cron.schedule('0 */45 * * * *', () => {
    (async () => {
        const parser = new Parser()
        const feed = await parser.parseURL("https://news.google.com/rss/search?q=coronavirus")
        fs.writeFileSync(filePath, JSON.stringify(feed))
    })()
})
