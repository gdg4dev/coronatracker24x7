const download = require('download-file')
const fs = require('fs')
const csv = require('csvtojson')
const path = require('path')
let newFilePath
const url = "https://static.dwcdn.net/data/NcpLC.csv"
const downloadOptions = {
    directory: "./latestCoronaData/",
    filename: "coronav1data.csv"
}
const scrapData = async (f) => {
    await download(url, downloadOptions, (err) => {
        if (err) {
            throw err
        }
        console.log("downloaded")
        newFilePath = path.join(__dirname, '../latestCoronaData/' + downloadOptions.filename)
        console.log(__dirname)
        console.log(newFilePath)
        f(newFilePath)
    })
}
const convertDataIntoJsonAPI = (d) => {
    scrapData((a) => {
        const csvFilePath = a
        csv()
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                d(jsonObj)
                // fs.unlink(csvFilePath, (err) => {
                //     if (err) throw err;
                //     console.log('Old data removed successfully!');
                // })
            })
    })
}


module.exports = convertDataIntoJsonAPI