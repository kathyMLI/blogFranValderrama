export default {
  post(id) {
    return {
      // path: `/post/${id}.json`,
      path: id,
      resolve: (response, mappers) => {
        let { fields } = response.toPlainObject()
        console.log('fields: ', fields)
        let { title, body, maquillaje, slug, imageMedium, imageBottom, styling } = fields
        // let { title } = response.results[0]
        let urlMedium = `https:${imageMedium.fields.file.url}`
        let urlBottom = `https:${imageBottom.fields.file.url}`
        console.log('urlMedium: ', urlMedium)
        console.log('urlBottom: ', urlBottom)
        body = '<p>' + body.split('\n\n').join('</p><p>') + '</p>'
        let content = body
        return mappers.merge({ title, content, maquillaje, slug, urlMedium, urlBottom, styling })
      }
    }
  }
}
