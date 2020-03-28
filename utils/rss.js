const fs = require('fs');
const rss = (l = 1, d) => {

    fs.readFile("./latestCoronaData/rss.json", "UTF8", async(err, data) => {
        if (err) { throw err };
        global_data = JSON.parse(data);
        finalDdata = global_data
        d(finalDdata.items.slice(0, l));
    })
}

module.exports = rss