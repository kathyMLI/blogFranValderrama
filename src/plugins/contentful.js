const contentful = require('contentful');

// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js

const config = {
};


// export `createClient` to use it in page components
module.exports = {
  createClient () {
    return contentful.createClient(config)
  }
}