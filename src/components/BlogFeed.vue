<template>
  <div>
    <transition-group v-if="resultRecived" tag="ul" :name="transition"  class="blog__feed">
      <li v-for="(post,index) in feed" class="preview" :key="'component'+index" @mouseover="hoverEffect('component'+index)" @mouseleave="noHoverEffect" :style= "[hoverEffectActive=='component'+index ?   getBgImg(post.image) : { backgroundColor: 'white' }]">
        <figure class="preview__figure">
          <transition name="v--fade">
            <figcaption v-if="!reading || $device.phone" class="preview__details">
              <div class="preview__title"
               :style= "[hoverEffectActive=='component'+index ? { color: 'white' } : { color: 'black' }]"
                >
                <div>{{ post.title }}</div>
                <div>
                  <div class="preview__dataBook" style="font-size: 1.9rem;font-weight: 300;">{{ prettyName(post.author)[1] }} {{ prettyName(post.author)[0] }}</div>
                  <div style="font-size: 1.0rem;font-weight: 200;">editorial: {{ post.editorial }}</div>
                  <div style="font-size: 0.5rem;font-weight: 200;">ISBN: {{post.isbn}}</div>

                </div>
                <div class="preview__priceBook" style="position: absolute; bottom: 0;">

                  <div>
                    <div>
                      <time class="preview__published">
                        oferta disponible hasta {{ prettyDate(post.dateFinish) }}
                      </time>
                    </div>
                    <div style="text-decoration:line-through;font-size:1.5rem;">${{post.price}}</div>
                    <div style="padding-bottom: 20%">
                      ${{post.promo}}
                      <a href="" v-on:click.stop.prevent="openWindow(srcWs+post.isbn)"><font-awesome-icon icon="shopping-cart" /></a>
                      </div>
                  </div>
                </div>  
              </div>
            </figcaption>
          </transition>
        </figure>
      </li>
    </transition-group>
    <div v-if="!resultRecived" class="preview__flex-container">
        <div class="preview__row"> 
            <div class="preview__flex-item">No se encontraron resultados 😥</div>
        </div>
      </div>
    </div>  
</template>

<script>
import { scrollTo, kebabify, prettyDate, prettyName } from '../helpers'

export default {
  name: 'blog-feed',
  resource: 'BlogFeed',

  props: {
    filters: {
      type: Object,
      default: () => {}
    },
    keySearch: {
      type: String,
      default: ''
    },
    searchClicked: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      posts: [],
      transition: 'preview-appear',
      resultRecived: false,
      hoverEffectActive: -1,
      srcWs: 'https://wa.me/56975836768?text=Hola%20Pamela%20quiero%20comprar%20un%20libro%20con%20el%20ISBN%20:%20'
    }
  },
  watch: {
    keySearch: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler (val, oldVal) {
        // do your stuff
      }
    },
    searchClicked: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler (val, oldVal) {
        // do your stuff
        console.log('hice clcik dentro del hijo: ', this.keySearch, 'con val: ', val, 'old val: ', oldVal)
        this.$getResource('feed', this.keySearch)
          .then(posts => {
            this.posts = posts
            this.transition = 'preview'
            if (this.posts.length === 0) {
              console.log('no tengo resultados')
              this.resultRecived = false
            } else {
              this.resultRecived = true
            }
            /* if (!Object.keys(this.filters).length) {
              this.stackPosts(posts)
            } else {
              this.posts = posts
              this.transition = 'preview'
            } */
          })
      }
    }
  },
  computed: {
    reading() { return this.filters.post },
    scrollDelay() { return (this.$device.phone) ? 0 : 560 },
    figureClass() {
      return { 'preview__figure--mobile': this.$device.phone && this.reading }
    },
    feed() {
      const filterBy = {
        post: (filter, { id }) => filter === id,
        author: (filter, { author }) => filter === this.kebabify(author)
      }

      if (!Object.keys(this.filters).length) return this.posts

      return this.posts.filter(post => {
        return Object.keys(this.filters).every(filter => {
          return filterBy[filter](this.filters[filter], post)
        })
      })
    }
  },

  methods: {
    scrollTo,
    kebabify,
    prettyDate,
    prettyName,
    getBgImg(src) {
      if (src !== '') {
        return { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${src}')` }
      }
      return { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${src}')` }
    },
    hoverEffect(index) {
      this.hoverEffectActive = index;
    },
    noHoverEffect() {
      this.hoverEffectActive = -1;
    },
    openWindow: function (link) {
      window.open(link);
    },
    stackPosts(posts) {
      let interval
      const stack = () => {
        this.posts.push(posts.shift())

        if (!posts.length) {
          this.transition = 'preview'
          clearInterval(interval)
        }
      }

      interval = setInterval(stack, 125)
    }
  },

  mounted() {

  }
}
</script>
