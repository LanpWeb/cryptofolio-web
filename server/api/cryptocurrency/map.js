const rp = require("request-promise");

const config = require("../../config/default");

exports.init = router => router.get("/api/cryptocurrency/map", async ctx => {
  const requestOptions = {
    method: "GET",
    uri: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/map",
    headers: {
      "X-CMC_PRO_API_KEY": config.coinMarketCapKey
    },
    json: true,
    gzip: true
  };

  const res = await rp(requestOptions);

  if (res.status.error_code === 0) {
    ctx.status = 200;
    ctx.body = res.data;
  } else {
    ctx.throw(res.status.error_message, 400);
  }
});
