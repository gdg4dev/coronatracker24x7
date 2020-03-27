const fs = require('fs');
const graphcdata = (d) => {
    fs.readFile("./latestCoronaData/graphcdata.json", "UTF8", function(err, data) {
        if (err) { console.log('graphdatac err') };
        try {
            g_data = JSON.parse(data);
            d(g_data);
        } catch (e) {
            console.log('error')
        }
    })
}

module.exports = graphcdata