import axios from 'axios'
import cache from './cache'
import _merge from 'lodash.merge'

// install $resource as a Vue plugin
export default {
  install(Vue, { endpoint = '', resources = {} }) {
    // add the method to the Vue prototype
    Vue.prototype.$getResource = function(method, options) {
      // options= endpoint
      // method =
      // this "this" references "this" in this component, ok?
      if (method === 'feed') {
        let name = this.$options.resource
        if (!name || !resources[name] || !resources[name][method]) return;
        // get fetch path and response resolver/mapper
        //  we call the resource method, defined as a string by the first argument, and pass in any option received as the second argument
        /* yo tengo 3 resources:
        1.method: blog / options: Blog -> resolve: return mappers.merge..etc // path: '/blog.json'
        2.method: feed / options: BlogFeed -> resolve:  (response, mappers) => mappers.pipe(response.results) // path: '/feed.json'
        3.method: post / options: BlogPost -> resolve: mappers.merge({ title, content, ...meta }) // path: `/post/${id}.json`
        */
        let { resolve } = resources[name][method](options)
        let optionsClean = options.replace(/\s/g, '')
        let uri = ''
        if (optionsClean !== '') {
          uri = 'https://viaje-lector.herokuapp.com/v1/search?book=' + optionsClean
        } else {
          uri = 'https://viaje-lector.herokuapp.com/v1/search?book=corazon'
        }
        // methods return promise to allow chaining
        const mappers = {
          // only return promise without modifying instance $data
          pipe: dataSet => Promise.resolve(dataSet),
          // deep merge object with instance $data
          merge: dataSet => {
            console.log('dataSet: ', dataSet)
            _merge(this.$data, dataSet)
            console.log('this.$data: ', this.$data)
            return Promise.resolve(dataSet)
          },
          /* Vue no permite añadir dinámicamente en el nivel raiz nuevas propiedades
          reactivas a una instancia ya creada. Sim embargo, se pueden añadir propiedades
          reactivas a un objeto anidado usando el método Vue.set(object, key, value) */
          set: dataSet => {
            Object.keys(dataSet).forEach(prop => {
              // add reactive properties to a nested object
              // Vue.set(object, propertyName, value)
              // prop = las llaves de data set: title, nav y labels para blog
              this.$set(this.$data, prop, dataSet[prop])
            })
            return Promise.resolve(dataSet)
          }
        }
        console.log('uri: ', uri)
        // uri: /static/api/feed.json
        // uri: /static/api/blog.jso
        // check to see if the resource has been cached already
        if (cache.has(uri)) return resolve(cache.get(uri), mappers)
        // fetch, parse and cache resource then pass to resolver
        return axios.get(uri)
          .then(response => cache.set(uri, response))
          .then(response => resolve(response, mappers))
      }
    }
  }
}
