const download = require('download-file');
const cron = require('node-cron');
const downloadOptions = {
    directory: "./latestCoronaData/",
    filename: "apiV1Data.csv"
};
const url = "https://static.dwcdn.net/data/NcpLC.csv";
(() => {
    cron.schedule('*/59 * * * *', () => {
        download(url, downloadOptions, (err) => {
            if (err) {
                throw err;
            }
            console.log("downloaded api1data");
        });
    })
})();