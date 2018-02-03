'use strict'

const https = require('https')
const { stringify } = require('querystring')

module.exports = class Eztv {
  constructor () {
    this.config = {
      host: 'eztv.ag',
      path: '/api/get-torrents?'
    }
  }

  getTorrents (query) {
    return this.validateParams(query)
      .then(() => this.sendRequest(query))
  }

  validateParams (query) {
    return new Promise((resolve, reject) => {
      // We technically don't need any params
      if (!query) {
        return resolve()
      }

      // The params we do have should be integers
      // limit, page, imdb_id
      Object.keys(query).forEach(key => {
        if (isNaN(parseFloat(query[key]))) {
          reject(new Error(`The value for ${key} must be an integer`))
        }
      })

      resolve()
    })
  }

  sendRequest (query) {
    return new Promise((resolve, reject) => {
      const req = {
        host: this.config.host,
        path: this.config.path + stringify(query)
      }

      https.get(req, res => {
        let body = ''

        res.setEncoding('utf8')

        res.on('data', d => {
          body += d
        })

        res.on('end', () => {
          try {
            resolve(JSON.parse(body))
          } catch (err) {
            reject(err)
          }
        })
      }).on('error', err => reject(err))
    })
  }
}
