const download = require('download-file');
const cron = require('node-cron');
const downloadOptions = {
    directory: "./latestCoronaData/",
    filename: "coronaGraphData.csv",
    timeout: 200000
};
const url = "https://raw.githubusercontent.com/RamiKrispin/coronavirus-csv/master/coronavirus_dataset.csv";
// (() => {
//     cron.schedule('*/1 * * * *', () => {
//         console.log('cron started')

//     })
// })();
// download(url, downloadOptions, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("downloaded graph data");
// });