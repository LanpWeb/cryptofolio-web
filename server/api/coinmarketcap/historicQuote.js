const rp = require("request-promise");

const config = require("../../config/default");

const getHistoricQuote = (coinId, date) => {
  if (!(date >= 1566086400 && date <= 1567123200)) {
    return;
  }

  const requestOptionsInfo = {
    method: "GET",
    uri: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical",
    qs: {
      id: coinId,
      count: 1,
      time_end: date
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

module.exports = getHistoricQuote;
