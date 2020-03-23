const fs = require('fs');
const coronaLatinAmerica = (d) => {
    fs.readFile("./tmp/statistics_LatinAmerica.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = data;
        d(JSON.parse(global_data));
    })
}

module.exports = coronaLatinAmerica
