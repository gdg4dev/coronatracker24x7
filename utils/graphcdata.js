const fs = require('fs');
const graphcdata = (d) => {
    fs.readFile("./latestCoronaData/graphcdata.json", "UTF8", function(err, data) {
        if (err) { throw err };
        g_data = JSON.parse(data);
        // let finalData = g_data[0].concat(g_data[1]).concat(g_data[2]).concat(g_data[3]).concat(g_data[4])
        d(g_data);
    })
}

module.exports = graphcdata