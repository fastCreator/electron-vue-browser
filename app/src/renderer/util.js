export const remove = function (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export const getUrlId = function (url) {
  return url.replace(/\W/g, '');
}

