export default {
  blog() {
    return {
      path: '/blog.json',
      resolve: (response, mappers) => {
        if (response === 0) {
          console.log('entre Blog')
        } else {
          let blog = response.results[0]
          console.log('blog.post_label,: ', blog.author_label)
          return mappers.merge({
            title: blog.title,
            labels: {
              post: blog.post_label,
              author: blog.author_label
            }
          })
        }
      }
    }
  }
}
