<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <blog-nav :content="content" :filters="filters" :navs="navs"/>
    <div class="blog__searchStyle">
      <div class="blog__styleSearcher">
        <input class="blog__searchInput" v-model="search" placeholder="titulo, autor o ISBN">
      </div>
      <div>
        <button v-on:click='searchClicked = !searchClicked' class="blog__btnStyle">Buscar</button>
      </div>
    </div>
    <blog-feed :filters="filters" :keySearch="search" :searchClicked="searchClicked" />
    <blog-post :post="post"/>
    <blog-footer/>
  </main>
</template>

<script>
import BlogNav from './BlogNav'
import BlogFeed from './BlogFeed'
import BlogPost from './BlogPost'
import BlogFooter from './BlogFooter'

export default {
  name: 'blog',
  components: { BlogNav, BlogFeed, BlogPost, BlogFooter },
  resource: 'Blog',
  props: {
    post: String,
    author: String
  },

  data() {
    return {
      navs: 0,
      title: '',
      labels: {
        post: '',
        author: ''
      },
      search: '',
      searchClicked: false,
      resultSearch: ''
    }
  },
  methods: {
  },

  computed: {
    content() {
      return { title: this.title, labels: this.labels }
    },
    filters() {
      let filters = {}
      console.log('this.post::c ', this.post)
      if (this.post) filters.post = this.post
      if (this.author) filters.author = this.author

      return filters
    }
  },

  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  },

  mounted() {
  }
}
</script>
