const rp = require('request-promise')

const config = require('../../config/default')

exports.getQuotes = async (coinIds) => {
  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/cryptocurrency/quotes/latest`,
    qs: {
      id: coinIds,
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return Object.values(res.data)
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}

exports.getQuote = async (coinId) => {
  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/cryptocurrency/quotes/latest`,
    qs: {
      id: coinId,
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return Object.values(res.data)[0]
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}

exports.getPriceStats = async (coinId) => {
  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/cryptocurrency/price-performance-stats/latest`,
    qs: {
      id: coinId,
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return Object.values(res.data)[0]
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}

exports.getMap = async () => {
  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/cryptocurrency/map`,
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return res.data
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}

exports.getLatest = async (start, limit) => {
  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/cryptocurrency/listings/latest`,
    qs: {
      start,
      limit,
      convert: 'USD',
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return res.data
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}

exports.getInfo = async (slug) => {
  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/cryptocurrency/info`,
    qs: {
      slug,
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return Object.values(res.data)[0]
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}

exports.getHistoricQuotes = async (coinId) => {
  const timeEnd = 1567123200
  const timeStart = 1566086400
  const interval = '1h'

  // switch (period) {
  //   case "year":
  //     interval = "30d";
  //     timeStart = timeEnd - 31536000;
  //     break;
  //   case "3months":
  //     interval = "15d";
  //     timeStart = timeEnd - 7884000;
  //     break;
  //   case "month":
  //     interval = "15d";
  //     timeStart = timeEnd - 2628000;
  //     break;
  //   case "week":
  //     interval = "12h";
  //     timeStart = timeEnd - 604800;
  //     break;
  //   case "day":
  //     interval = "30m";
  //     timeStart = timeEnd - 86400;
  //     break;
  //   default:
  //     interval = "1h";
  //     break;
  // }

  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/cryptocurrency/quotes/historical`,
    qs: {
      id: coinId,
      interval,
      time_start: timeStart,
      time_end: timeEnd,
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return res.data
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}

exports.getHistoricQuote = async (coinId, date) => {
  if (!(date >= 1566086400 && date <= 1567123200)) {
    throw new Error(
      'Date should be in timestamp range [1566086400, 1567123200]'
    )
  }

  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/cryptocurrency/quotes/historical`,
    qs: {
      id: coinId,
      count: 1,
      time_end: date,
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return res.data
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}

exports.getGlobalStats = async () => {
  const requestOptionsInfo = {
    method: 'GET',
    uri: `${config.coinMarketCapUrl}/v1/global-metrics/quotes/latest`,
    qs: {
      convert: 'USD',
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    return res.data
  } catch (err) {
    throw new Error(err.response.body.status.error_message)
  }
}
