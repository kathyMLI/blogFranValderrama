import animateScroll from 'scrollto-with-animation'

export const scrollTo = (pos, duration = 600, delay = 0) => new Promise(resolve => {
  setTimeout(() => {
    animateScroll(document.documentElement, 'scrollTop', pos, duration, 'easeInOutSine', resolve)
  }, delay)
})

export const kebabify = (words) =>
  words
    .toLowerCase()
    .replace(' ', '-')
export const prettyDate = (dateInput) => {
  let date = new Date(dateInput)
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  if (month < 10) {
    return `${day}-0${month}-${year}`
  } else {
    return `${day}-${month}-${year}`
  }
}
export const prettyName = (words) =>
  words
    .toLowerCase()
    .split(',')
