const cron = require("node-cron");
const stats = require("./fetchData");
console.log("Scraper scheduled.");//Fetch data three minutes.
cron.schedule("*/30 * * * *", () => {
  try {
    console.log("Fetching data.");
    stats.fetchAllData();
  } catch (error) {
    console.error(error)
  }
});
