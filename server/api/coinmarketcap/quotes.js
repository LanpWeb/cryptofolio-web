const rp = require("request-promise");

const config = require("../../config/default");

const getQuotes = slug => {
  const requestOptionsInfo = {
    method: "GET",
    uri: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    qs: {
      slug
    },
    headers: {
      "X-CMC_PRO_API_KEY": config.coinMarketCapKey
    },
    json: true,
    gzip: true
  };

  return new Promise((resolve, reject) => {
    rp(requestOptionsInfo).then(res => {
      const resQuotes = Object.values(res.data)[0];
      resolve(resQuotes);
    }).catch((err) => {
      reject(err.response.body.status.error_message);
    });
  });
};

module.exports = getQuotes;