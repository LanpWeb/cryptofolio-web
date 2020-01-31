const rp = require("request-promise");

exports.init = router => router.get("/api/cryptocurrency/latest", async ctx => {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    qs: {
      start: "1",
      limit: "10",
      convert: "USD"
    },
    headers: {
      "X-CMC_PRO_API_KEY": "212b135f-ee94-4dbb-9d50-6415ef556316"
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
