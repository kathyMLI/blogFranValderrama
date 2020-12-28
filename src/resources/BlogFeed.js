export default {
  feed() {
    return {
      path: '/feed.json',
      resolve: (response, mappers) => {
        console.log('qe llega bb: ', response)
        let { data } = response;
        // const myArray = [{x:100}, {x:200}, {x:300}];
        console.log('que es data?:  ', data)
        let id = data.map(element => element.id);
        console.log('id: ', id);
        let createdAt = new Date();
        console.log('createdAt: ', createdAt);
        let title = data.map(element => element.title);
        console.log('title: ', title);
        let author = 'autor'
        console.log('author: ', author);
        let imageTop = data.map(element => element.url_book_cover);
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
          person.author = author
          person.image = imageTop[index]
          person.published = new Date()
          person.title = title[index]
          person.id = id[index]
          fruits2.push(person)
        }
        console.log('fruits2: ', fruits2)
        console.log('mappers: ', mappers.pipe(fruits2))
        return mappers.pipe(fruits2)
      }
    }
  }
}
