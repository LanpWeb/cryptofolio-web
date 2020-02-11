const rp = require("request-promise");

const config = require("../../config/default");

const getGlobalStats = () => {
  const requestOptionsInfo = {
    method: "GET",
    uri: "https://sandbox-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
    qs: {
      convert: "USD"
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

module.exports = getGlobalStats;
