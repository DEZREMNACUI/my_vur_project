import myRequest from '../request'

export function getHomeHotSuggests() {
  return myRequest.get({
    url: "/home/hotSuggests"
  })
}

export function getHomeCategories() {
  return myRequest.get({
    url: "/home/categories"
  })
}

export function getHomeHouselist(currentPage: number) {
  return myRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}

