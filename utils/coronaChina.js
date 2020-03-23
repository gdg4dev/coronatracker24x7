const fs = require('fs');
const coronaChina = (d) => {
    fs.readFile("./tmp/statistics_China.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = data;
        d(JSON.parse(global_data));
    })
}

module.exports = coronaChina
