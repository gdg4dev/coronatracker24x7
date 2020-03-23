const fs = require('fs');
const coronaEurope = (d) => {
    fs.readFile("./tmp/statistics_Europe.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = data;
        d(JSON.parse(global_data));
    })
}

module.exports = coronaEurope
