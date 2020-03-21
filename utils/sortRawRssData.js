const fs = require('fs');
const rss = (l = 1, d) => {
    fs.readFile("./latestCoronaData/rawRssData.json", "UTF8", function (err, data) {
        if (err) { throw err };
        g_data = JSON.parse(data);
        let finalData = g_data[0].concat(g_data[1]).concat(g_data[2]).concat(g_data[3]).concat(g_data[4])
        d(finalData.slice(0, l));
    })
}

module.exports = rss