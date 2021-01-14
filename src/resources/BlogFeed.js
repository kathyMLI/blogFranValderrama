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
        let dateFinish = data.map(element => element.date_finish);
        let title = data.map(element => element.title);
        let author = data.map(element => element.author);
        let imageTop = data.map(element => element.url_book_cover);
        let editorial = data.map(element => element.editorial);
        let isbn = data.map(element => element.isbn);
        let price = data.map(element => element.price);
        let promo = data.map(element => element.promo);
        console.log('que es isbn?:  ', isbn)

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
          person.image = imageTop[index]
          person.dateFinish = dateFinish[index]
          person.title = title[index]
          person.id = id[index]
          person.editorial = editorial[index]
          person.isbn = isbn[index]
          person.price = price[index];
          person.promo = promo[index];
          fruits2.push(person)
        }
        console.log('fruits2: ', fruits2)
        console.log('mappers: ', mappers.pipe(fruits2))
        return mappers.pipe(fruits2)
      }
    }
  }
}
