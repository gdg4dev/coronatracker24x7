const fs = require('fs');
const rss = (l = 1, d) => {
    fs.readFile("./latestCoronaData/rss.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = JSON.parse(data);
        d(global_data.items.slice(0, l));
    })
}

module.exports = rss