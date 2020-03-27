'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  env: {
    CTF_SPACE_ID: '"yyi178t44r0b"',
    CTF_CDA_ACCESS_TOKEN: '"a_OGKxVZ7VGhj9BuJmJRoPPfJ7XTcIWyQdxocoIWVjo"'
  }
})
