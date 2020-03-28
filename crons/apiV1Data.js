const download = require('download-file');
const cron = require('node-cron');
const downloadOptions = {
    directory: "./latestCoronaData/",
    filename: "apiV1Data.csv"
};
const url = "http://static.dwcdn.net/data/NcpLC.csv";
(() => {
    cron.schedule('*/15 * * * *', () => {
        download(url, downloadOptions, (err) => {
            if (err) {
                console.log(err)
            }
            console.log("downloaded api1data");
        });
    })
})();