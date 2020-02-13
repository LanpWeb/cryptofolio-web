const withAuth = require("../../middleware/withAuth");

const getQuotes = require("../coinmarketcap/quotes");

const User = require("../../models/users");

exports.init = router => {
  router.get("/api/watchlist", withAuth, async ctx => {
    const { watchlist } = ctx.state.user;

    if (watchlist.length === 0) {
      ctx.throw("There are no coins in watchlist.", 400);
    }

    const slugs = watchlist.join(",");
    const quotesRes = await getQuotes(slugs);

    ctx.status = 200;
    ctx.body = quotesRes;
  });

  router.post("/api/watchlist", withAuth, async ctx => {
    const { id, watchlist } = ctx.state.user;
    const { coin } = ctx.request.body;

    if (coin.length === 0) {
      ctx.throw("Coin is empty.", 400);
    }

    if (watchlist.length !== 0 && watchlist.includes(coin)) {
      const newWatchlist = watchlist.filter(item => item !== coin);
      await User.findByIdAndUpdate(id, { watchlist: newWatchlist });
    } else {
      await User.findByIdAndUpdate(id, { $push: { watchlist: coin } });
    }

    ctx.status = 200;
  });
};
