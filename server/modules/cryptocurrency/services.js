const rp = require('request-promise')

const { DateTime } = require('luxon')

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

exports.getHistoricQuotes = async (
  coinId,
  timeStart = 1566086400,
  timeEnd = 1567123200,
  interval = '1h'
) => {
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

// eslint-disable-next-line no-unused-vars
exports.getHistoricData = async (ids, startTimestamp, endTimestamp) => {
  const start = DateTime.fromSeconds(startTimestamp)

  const requestOptionsInfo = {
    method: 'GET',
    uri: `https://api.nomics.com/v1/currencies/sparkline`,
    qs: {
      key: 'cab6abe9a3c6350256a606a80377d552',
      ids,
      start: start.toISO(),
      // end,
    },
    json: true,
    gzip: true,
  }

  try {
    const res = await rp(requestOptionsInfo)
    console.log(res)

    return res
  } catch (err) {
    console.log(err)
    throw new Error(err.response.body)
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
