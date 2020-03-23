const fs = require('fs');
const coronaCanada = (d) => {
    fs.readFile("./tmp/statistics_Canada.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = data;
        d(JSON.parse(global_data));
    })
}

module.exports = coronaCanada
