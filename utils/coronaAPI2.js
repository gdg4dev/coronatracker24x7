const csv = require('csvtojson')
const path = require('path')
let newFilePath = path.join(__dirname, '../latestCoronaData/apiV2data.csv')
const convertDataIntoJsonAPI = (d) => {
    csv()
        .fromFile(newFilePath)
        .then((jsonObj) => {
            d(jsonObj)
        })
}
module.exports = convertDataIntoJsonAPI