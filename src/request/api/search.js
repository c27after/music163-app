import server from '../request'

export function searchSongs(data) {
  return server({
    methods: 'GET',
    url: `/search?keywords=${data}`,
  })
}
