const jwt = require('jsonwebtoken')

const authUtil = require('../../utils/auth')
const config = require('../../config/default')

const CryptocurrencyService = require('../cryptocurrency/services')
const UserService = require('./services')

exports.signIn = async (ctx) => {
  const { id } = ctx.state.user
  const refreshToken = authUtil.createRefreshToken(id)

  try {
    await UserService.appendRefreshToken(id, refreshToken)

    ctx.cookies.set('refreshToken', refreshToken, config.refreshTokenCookie)
    ctx.status = 200
    ctx.body = { accessToken: authUtil.createAccessToken(id) }
  } catch (err) {
    ctx.throw(err.message, 400)
  }
}

exports.signUp = async (ctx) => {
  const { email, password } = ctx.request.body

  try {
    const user = await UserService.createUser(email, password)
    const { id } = user

    const refreshToken = authUtil.createRefreshToken(id)

    ctx.cookies.set('refreshToken', refreshToken, config.refreshTokenCookie)
    ctx.status = 200
    ctx.body = { accessToken: authUtil.createAccessToken(id) }
  } catch (err) {
    ctx.throw(err.message, 400)
  }
}

exports.logout = async (ctx) => {
  const refreshToken = ctx.cookies.get('refreshToken')
  const { id, refreshTokens } = ctx.state.user

  const newRefreshTokens = refreshTokens.filter((item) => item !== refreshToken)

  try {
    await UserService.replaceRefreshTokens(id, newRefreshTokens)

    ctx.cookies.set('refreshToken', null)
    ctx.status = 200
  } catch (err) {
    ctx.throw(err.message, 400)
  }
}

exports.forcedLogout = async (ctx) => {
  const { id } = ctx.state.user

  try {
    await UserService.replaceRefreshTokens(id, [])

    ctx.cookies.set('refreshToken', null)
    ctx.status = 200
  } catch (err) {
    ctx.throw(err.message, 400)
  }
}

exports.devicesLogout = async (ctx) => {
  const refreshToken = ctx.cookies.get('refreshToken')
  const { id, refreshTokens } = ctx.state.user

  const newRefreshTokens = refreshTokens.filter((item) => item === refreshToken)

  try {
    await UserService.replaceRefreshTokens(id, newRefreshTokens)

    ctx.status = 200
  } catch (err) {
    ctx.throw(err.message, 400)
  }
}

exports.verifyJwt = async (ctx) => {
  const { accessToken } = ctx.request.body

  const payload = jwt.verify(
    accessToken,
    config.accessTokenSecret,
    (err, decoded) => {
      if (err) {
        ctx.throw(err.message, 400)
      }
      return decoded
    }
  )

  ctx.status = 200
  ctx.body = {
    ...payload,
    iat: undefined,
  }
}

exports.updateRefreshToken = async (ctx) => {
  const refreshToken = ctx.cookies.get('refreshToken')
  const { id, refreshTokens } = ctx.state.user

  if (!refreshTokens.includes(refreshToken)) {
    ctx.throw('Malformed refresh token.', 400)
  }

  const newRefreshToken = authUtil.createRefreshToken(id)
  const newRefreshTokens = refreshTokens.filter((item) => item !== refreshToken)
  newRefreshTokens.push(newRefreshToken)

  try {
    await UserService.replaceRefreshTokens(id, newRefreshTokens)

    ctx.cookies.set('refreshToken', newRefreshToken, config.refreshTokenCookie)
    ctx.status = 200
    ctx.body = { accessToken: authUtil.createAccessToken(id) }
  } catch (err) {
    ctx.throw(err.message, 400)
  }
}

exports.getMe = async (ctx) => {
  const { id, email, watchlist } = ctx.state.user

  ctx.status = 200
  ctx.body = {
    id,
    email,
    watchlist,
  }
}

exports.getWatchlist = async (ctx) => {
  const { watchlist } = ctx.state.user

  if (watchlist.length === 0) {
    ctx.status = 200
    ctx.body = []
  } else {
    const coinIds = watchlist.join(',')

    try {
      const quotesRes = await CryptocurrencyService.getQuotes(coinIds)

      ctx.status = 200
      ctx.body = quotesRes.sort((a, b) => a.cmc_rank - b.cmc_rank)
    } catch (err) {
      ctx.throw(err.message, 400)
    }
  }
}

exports.toggleWatchlist = async (ctx) => {
  const { id, watchlist } = ctx.state.user
  const { coinId } = ctx.request.body

  if (coinId.length === 0) {
    ctx.throw('Coin is empty.', 400)
  }

  try {
    await UserService.toggleWatchlist(id, watchlist, coinId)
    ctx.status = 200
  } catch (err) {
    ctx.throw(err.message, 400)
  }
}

exports.changePassword = async (ctx) => {
  const { id } = ctx.state.user
  const { newPassword } = ctx.request.body

  try {
    await UserService.changePassword(id, newPassword)
    ctx.status = 200
  } catch (err) {
    ctx.throw(err.message, 400)
  }
}
