var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var apiUrl = require('./api-url-dev.js')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true
}, apiUrl)
