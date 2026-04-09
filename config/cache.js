const cacheNode = require("cache-node");

const cache = cacheNode({
  ttl: 60, // time untuk mengambil data dari cache (dalam detik)
  checkPeriod: 120, // check expired cache setiap 120 detik
});

module.exports = cache;