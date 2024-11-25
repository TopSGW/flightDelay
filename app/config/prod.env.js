var merge = require('webpack-merge')
var apiUrl = require('./api-url-prod.js')

module.exports = merge({
  NODE_ENV: '"production"',
  DEBUG_MODE: false
}, apiUrl)
