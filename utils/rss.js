const fs = require('fs');
const rss = (l = 1, d) => {
    function dedupe(arr) {
        return arr.reduce(function(p, c) {
      
          // create an identifying id from the object values
          var id = [c.title, c.urlToImage].join('|');
      
          // if the id is not found in the temp array
          // add the object to the output array
          // and add the key to the temp array
          if (p.temp.indexOf(id) === -1) {
            p.out.push(c);
            p.temp.push(id);
          }
          return p;
      
          // return the deduped array
        }, {
          temp: [],
          out: []
        }).out;
      }
    fs.readFile("./latestCoronaData/rss.json", "UTF8", function (err, data) {
        if (err) { throw err };
        global_data = JSON.parse(data);
        let finalDdata = dedupe(global_data)
        d(finalDdata.items.slice(0, l));
    })
}

module.exports = rss