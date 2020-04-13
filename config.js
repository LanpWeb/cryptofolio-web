// @flow

import getConfig from 'next/config'

const nodeEnv = process.env.NODE_ENV
const { publicRuntimeConfig } = getConfig()
const { env } = publicRuntimeConfig

const developmentURL = 'http://localhost:3004'
const serverDevURL = 'https://cryptofolio-web.herokuapp.com'
const serverProdURL = 'https://cryptofolio-web.herokuapp.com'

const getBaseURL = (environment: string) => {
  if (environment === 'development') {
    return developmentURL
  }
  if (environment === 'server-dev') {
    return serverDevURL
  }
  if (environment === 'server-prod') {
    return serverProdURL
  }
  return serverDevURL
}

const baseURL = nodeEnv === 'test' ? developmentURL : getBaseURL(env)

const apiURL = `${baseURL}/api`

export { baseURL, apiURL }
