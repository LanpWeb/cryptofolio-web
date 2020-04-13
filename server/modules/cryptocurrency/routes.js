const CryptocurrencyController = require('./controllers')

exports.init = (router) => {
  // router.get("/api/cryptocurrency/graph", CryptocurrencyController.getGraph);
  router.get('/api/cryptocurrency/info/:slug', CryptocurrencyController.getInfo)
  router.get('/api/cryptocurrency/latest', CryptocurrencyController.getLatest)
  router.get('/api/cryptocurrency/map', CryptocurrencyController.getMap)
  router.get(
    '/api/cryptocurrency/global-stats',
    CryptocurrencyController.getGlobalStats
  )
}
