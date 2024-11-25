var merge = require('webpack-merge')
var devEnv = require('./dev.env')
var apiUrl = require('./api-url-test.js')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  DEBUG_MODE: false
}, apiUrl)
