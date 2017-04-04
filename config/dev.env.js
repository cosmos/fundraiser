var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

let baseUrl = process.env.COSMOS_BASE_URL
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  COSMOS_BASE_URL: baseUrl ? `"${baseUrl}"` : null
})
