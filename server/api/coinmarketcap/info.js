const rp = require("request-promise");

const config = require("../../config/default");

const getInfo = slug => {
  const requestOptionsInfo = {
    method: "GET",
    uri: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/info",
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
      const infoRes = Object.values(res.data)[0];
      resolve(infoRes);
    }).catch((err) => {
      reject(err.response.body.status.error_message);
    });
  });
};

module.exports = getInfo;
