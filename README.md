# EZTV

This is a very simple api wrapper in Node using Promises. This uses the official [beta] [api for EZTV](https://eztv.ag/api/).

## Installation

```bash
npm i eztv-b --save
```

## Usage

### Initialize

```javascript
const Eztv = require('eztv-b')

// Create a new instance of the module.
const eztv = new Eztv()
```

### `getTorrents()`

The only method, `getTorrents()`, takes an object of parameters to be passsed to the api: `imdb_id`, `page`, and/or `limit`. You don't have to pass anything in, it will just list recent files. According to the [documentation](https://eztv.ag/api/), the max you can have per page is 100.

```javascript
// Search by the imdb id
eztv.getTorrents({
  imdb_id: 4574334
  // page: 1
  // limit: 1
})
.then(response => {
  console.log(response)
  // Output:
  // {
  //   "imdb_id": "4574334",
  //   "torrents_count": 44,
  //   "limit": 30,
  //   "page": 1,
  //   "torrents": [
  //     {
  //       "id": 416781,
  //       "hash":"0f7be5652c8edab38b93d2ed00fa619fb015b5e8",
  //       "filename":"Stranger.Things.S02E09.720p.WEBRip.x264-STRiFE[eztv].mkv",
  //       "episode_url":"https:\/\/eztv.ag\/ep\/416781\/stranger-things-s02e09-720p-webrip-x264-strife\/",
  //       "torrent_url":"https:\/\/zoink.ch\/torrent\/Stranger.Things.S02E09.720p.WEBRip.x264-STRiFE[eztv].mkv.torrent",
  //       "magnet_url":"magnet:?...",
  //       "title":"Stranger Things S02E09 720p WEBRip x264-STRiFE EZTV",
  //       "imdb_id":"4574334",
  //       "season":"2",
  //       "episode":"9",
  //       "small_screenshot":"\/\/ezimg.ch\/thumbs\/stranger-things-s02e09-720p-webrip-x264-strife-small.jpg",
  //       "large_screenshot":"\/\/ezimg.ch\/thumbs\/stranger-things-s02e09-720p-webrip-x264-strife-large.jpg",
  //       "seeds":527,
  //       "peers":229,
  //       "date_released_unix":1509112801,
  //       "size_bytes":"1242151349"
  //     },
  //     {
  //       "id":416777,
  //       ...
  //     }
  //   ]
  // }
})
.catch(err => console.error(err))

// List recent torrents
eztv.getTorrents()
  .then(response => {
    ...
  })
  .catch(err => console.error(err))
```

## License

MIT
