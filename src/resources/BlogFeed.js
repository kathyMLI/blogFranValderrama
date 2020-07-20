export default {
  feed() {
    return {
      path: '/feed.json',
      resolve: (response, mappers) => {
        console.log('qe llega bb: ', response.toPlainObject())
        let { items } = response.toPlainObject()
        // const myArray = [{x:100}, {x:200}, {x:300}];

        let id = items.map(element => element.sys.id);
        console.log('id: ', id);
        let createdAt = items.map(element => element.sys.createdAt);
        console.log('createdAt: ', createdAt);
        let title = items.map(element => element.fields.title);
        console.log('title: ', title);
        let author = items.map(element => element.fields.fotografa);
        console.log('author: ', author);
        let imageTop = items.map(element => element.fields.imageTop.fields.file.url);
        console.log('fotoTop: ', imageTop);
        // `/post/${id}.json`,

        /* {
        ok title: "dolor quis",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/450744/maarten-van-den-heuvel.jpg",
        ok published: "2016-10-27T09:42:32Z",
        ok author: "Tommi Filipson",
        ok id: "5lfT0VYpGU7P2PGwHAmDNs" } */
        var fruits2 = []
        for (let index = 0; index < id.length; index++) {
          var person = {};
          console.log('index: ', index)
          person.author = author[index]
          person.image = `https:${imageTop[index]}`
          person.published = createdAt[index]
          person.title = title[index]
          person.id = id[index]
          fruits2.push(person)
        }
        console.log('fruits2: ', fruits2)
        return mappers.pipe(fruits2)
      }
    }
  }
}