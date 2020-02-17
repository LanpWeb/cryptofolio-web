const withAuth = require("../../middleware/withAuth");

const getQuotes = require("../coinmarketcap/quotes");

const User = require("../../models/users");

exports.init = router => {
  router.get("/api/watchlist", withAuth, async ctx => {
    const { watchlist } = ctx.state.user;

    if (watchlist.length === 0) {
      ctx.status = 200;
      ctx.body = [];
    } else {
      const coinIds = watchlist.join(",");
      const quotesRes = await getQuotes(coinIds);

      ctx.status = 200;
      ctx.body = quotesRes;
    }
  });

  router.post("/api/watchlist", withAuth, async ctx => {
    const { id, watchlist } = ctx.state.user;
    const { coinId } = ctx.request.body;

    if (coinId.length === 0) {
      ctx.throw("Coin is empty.", 400);
    }

    if (watchlist.length !== 0 && watchlist.includes(coinId)) {
      const newWatchlist = watchlist.filter(item => item !== coinId);
      await User.findByIdAndUpdate(id, { watchlist: newWatchlist });
    } else {
      await User.findByIdAndUpdate(id, { $push: { watchlist: coinId } });
    }

    ctx.status = 200;
  });
};
