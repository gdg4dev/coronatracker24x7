const cron = require("node-cron");
const stats = require("./fetchData");
console.log("Scraper scheduled.");
stats.fetchAllData();
//Fetch data three minutes.
console.log('scraper connected')
cron.schedule("*/1 * * * *", () => {
  try {
    console.log("Fetching data.");
    stats.fetchAllData();
  } catch(error) {
    console.error(error)
  }
});
