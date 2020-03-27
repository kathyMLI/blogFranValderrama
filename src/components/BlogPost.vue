<template>
  <transition name="post">
    <article v-if="allReady" class="post">
      <header class="post__header">
        <h2 class="post__title">{{ title }}</h2>

      <h3>{{ maquillaje }}{{ slug }}{{styling}}</h3>

        <blockquote class="post__subtitle">{{ description }}</blockquote>
      </header>
      <section>
      <figure class="preview__figure" :class="figureClass" :style="getBgImg(urlMedium)"></figure>
      </section>
      <section>
      <figure class="preview__figure" :class="figureClass" :style="getBgImg(urlBottom)"></figure>
      </section>
      <section class="post__body rte" v-html="content"></section>

      <footer class="post__footer">
        <!-- <vue-disqus v-if="commentsReady" shortname="vue-blog-demo"
          :key="post" :identifier="post" :url="`https://vue-blog-demo.netlify.com/read/${post}`"/> -->
      </footer>
    </article>
  </transition>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus'
import { kebabify, prettyDate } from '../helpers'

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: { VueDisqus },
  props: { post: String },

  data() {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      commentsReady: false,
      ready: false,
      maquillaje: '',
      slug: '',
      styling: '',
      urlBottom: '',
      urlMedium: ''
    }
  },

  computed: {
    allReady() {
      return this.ready && this.post;
    }
  },

  watch: {
    post(to, from) {
      if (to === from || !this.post) return;

      this.commentsReady = false
      this.$getResource('post', to)
        .then(this.showComments)
        .then(() => {
          this.ready = true;
        });
    }
  },

  methods: {
    kebabify,
    prettyDate,
    getBgImg(src) {
      return { backgroundImage: `url(${src})` }
    },
    showComments() {
      // This is injected by prerender-spa-plugin on build time, we don't prerender disqus comments.
      if (window.__PRERENDER_INJECTED &&
          window.__PRERENDER_INJECTED.prerendered) {
        return;
      }

      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    }
  },

  mounted() {
    if (!this.post) {
      this.ready = true;
      return;
    }

    this.$getResource('post', this.post)
      .then(this.showComments)
      .then(() => {
        console.log('this.post: ', this.post)
        this.ready = true;
      });
  }
}
</script>
