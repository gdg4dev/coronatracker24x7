const download = require('download-file');
const cron = require('node-cron');
const downloadOptions = {
    directory: "./latestCoronaData/",
    filename: "coronaGraphData.csv"
};
const url = "https://raw.githubusercontent.com/RamiKrispin/coronavirus-csv/master/coronavirus_dataset.csv";
(() => {
    cron.schedule('* * 6 * *', () => {
        download(url, downloadOptions, (err) => {
            if (err) {
                throw err;
            }
            console.log("downloaded graph data");
        });
    })
})();