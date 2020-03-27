const contentful = require('contentful');

// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js

const config = {
  space: 'yyi178t44r0b',
  accessToken: 'a_OGKxVZ7VGhj9BuJmJRoPPfJ7XTcIWyQdxocoIWVjo'
};

// export `createClient` to use it in page components
module.exports = {
  createClient () {
    return contentful.createClient(config)
  }
}
