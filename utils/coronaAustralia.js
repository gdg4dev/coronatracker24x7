const fs = require('fs');
const coronaAustralia = (d) => {
    fs.readFile("./tmp/statistics_Australia.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = data;
        d(JSON.parse(global_data));
    })
}

module.exports = coronaAustralia
