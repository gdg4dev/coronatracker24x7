const fs = require('fs');
const countryDataFromFile = (d) => {
    fs.readFile("./latestCoronaData/affectedCountryList.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = data;
        d(JSON.parse(global_data));
    })
}

module.exports = countryDataFromFile