const rp = require("request-promise");

const config = require("../../config/default");

const getHistoricQuotes = (id, period) => {
  const timeEnd = Math.floor(Date.now() / 1000);
  let interval;
  let timeStart;

  switch (period) {
    // case "year":
    //   interval = "30d";
    //   timeStart = timeEnd - 31536000;
    //   break;
    // case "3months":
    //   interval = "15d";
    //   timeStart = timeEnd - 7884000;
    //   break;
    // case "month":
    //   interval = "15d";
    //   timeStart = timeEnd - 2628000;
    //   break;
    case "week":
      interval = "12h";
      timeStart = timeEnd - 604800;
      break;
    case "day":
      interval = "30m";
      timeStart = timeEnd - 86400;
      break;
    default:
      interval = "30m";
      timeStart = timeEnd - 86400;
      break;
  }

  const requestOptionsInfo = {
    method: "GET",
    uri: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical",
    qs: {
      id,
      interval,
      time_start: timeStart,
      time_end: timeEnd
    },
    headers: {
      "X-CMC_PRO_API_KEY": config.coinMarketCapKey
    },
    json: true,
    gzip: true
  };

  return new Promise((resolve, reject) => {
    rp(requestOptionsInfo).then(res => {
      resolve(res.data);
    }).catch((err) => {
      reject(err.response.body.status.error_message);
    });
  });
};

module.exports = getHistoricQuotes;
