const fs = require('fs');
const coronaUSA = (d) => {
    fs.readFile("./tmp/statistics_USA.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = data;
        d(JSON.parse(global_data));
    })
}

module.exports = coronaUSA
