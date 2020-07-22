export function getIdVideoYT(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  const id = match && match[7].length == 11 ? match[7] : false

  return id
}

export function getThumbnailVideoYT(url) {
  return `https://img.youtube.com/vi/${getIdVideoYT(url)}/default.jpg`
}

export function getUrlEmbed(url) {
  return `https://www.youtube.com/embed/${getIdVideoYT(url)}`
}
