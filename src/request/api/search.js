import server from '../request'

export function searchSongs(data) {
  return server({
    methods: 'GET',
    url: `/search?keywords=${data}`,
  })
}
//热搜
export function searchHotSongs() {
  return server({
    methods: 'GET',
    url: '/search/hot/detail',
  })
}
