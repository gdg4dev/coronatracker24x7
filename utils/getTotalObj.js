const fs = require('fs');
const totalObjFromFile = (d) => {
    fs.readFile("./latestCoronaData/totalObj.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = data;
        d(JSON.parse(global_data));
    })
}

module.exports = totalObjFromFile