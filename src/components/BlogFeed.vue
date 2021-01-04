<template>
  <div>
    <transition-group v-if="resultRecived" tag="ul" :name="transition"  class="blog__feed">
      <li v-for="(post,index) in feed" class="preview" :key="index">
        <figure class="preview__figure" :class="figureClass" :style="getBgImg(post.image)">
          <transition name="v--fade">
            <figcaption v-if="!reading || $device.phone" class="preview__details">
              <div class="preview__title"
                >
                <div>{{ post.title }}</div>
                <div>
                  <div class="preview__dataBook">{{ prettyName(post.author)[1] }} {{ prettyName(post.author)[0] }}</div>
                  <div>editorial: {{ post.editorial }}</div>
                  <div>ISBN: {{post.isbn}}</div>
                </div>
                <div class="preview__priceBook">
                  <div>10.000</div>
                  <div>
                    <font-awesome-icon icon="shopping-cart" />
                  </div> 
                </div>  
              </div>
              <div class="preview__meta">
                <time class="preview__published">
                  {{ prettyDate(post.dateFinish) }}
                </time>

                <!-- <router-link class="preview__author"
                  :to="`/by/${kebabify(post.author)}`"
                  @click.native="scrollTo(0, 220, scrollDelay)">
                  {{ post.author }}
                </router-link> -->
              </div>
            </figcaption>
          </transition>
        </figure>
      </li>
    </transition-group>
    <div v-if="!resultRecived" class="preview__flex-container">
    <div class="layout">
      <!-- ommited -->
      <SocialChat
        icon
        class="preview__whatsapp-chat"
        :attendants="attendants"
      >
        <p slot="header">Click one of our representatives below to chat on WhatsApp.</p>
        <MyWhatsAppIcon slot="button" />
        <small slot="footer">Opening hours: 8am to 6pm</small>
      </SocialChat>
    </div>
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
      attendants: [
        {
          app: 'whatsapp',
          label: 'Dueña',
          name: 'Pamela',
          number: '88888888',
          avatar: {
            src: 'https://avatars0.githubusercontent.com/u/8084606?s=460&u=20b6499a416cf7129a18e5c168cf387e159edb1a&v=4',
            alt: 'La cara de la Pame'
          }
        }
      ]
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
      return { backgroundImage: `url(${src})` }
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
    console.log('llega bien la busqueda?;', this.keySearch)
    /* this.$getResource('feed', this.keySearch)
      .then(posts => {
        this.posts = posts
        if (!Object.keys(this.filters).length) {
          this.stackPosts(posts)
        } else {
          this.posts = posts
          this.transition = 'preview'
        }
      }) */
  }
}
</script>
