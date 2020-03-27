export default {
  post(id) {
    return {
      // path: `/post/${id}.json`,
      path: id,
      resolve: (response, mappers) => {
        let { fields } = response.toPlainObject()
        console.log('fields: ', fields)
        let { title, body } = fields
        // let { title } = response.results[0]
        body = '<p>' + body.split('\n\n').join('</p><p>') + '</p>'
        let content = body
        return mappers.merge({ title, content })
      }
    }
  }
}
