'use strict'

const { expect } = require('chai')
const Eztv = require('..')

describe('eztv', () => {
  let eztv

  before(() => {
    eztv = new Eztv()
  })

  function testOutputAttributes (output) {
    expect(output).to.be.an('object')

    const random = Math.floor(Math.random() * output.torrents.length)
    const toTest = output.torrents[random]

    expect(output.torrents_count).to.be.a('number')
    expect(toTest.filename).to.be.a('string')
    expect(toTest.hash).to.be.a('string')
    expect(toTest.magnet_url).to.be.a('string')
  }

  it('should search for torrents', done => {
    eztv.getTorrents({
      imdb_id: '4574334',
      limit: 100
    }).then(res => {
      testOutputAttributes(res)
      done()
    }).catch(done)
  })

  it('should not find any torrents', done => {
    eztv.getTorrents({
      imdb_id: 1,
    }).then(res => {
      expect(res.torrents_count).to.equal(0)
      done()
    }).catch(done)
  })

  it('should throw an error when the wrong param values are given', done => {
    eztv.getTorrents({
      imdb_id: 'not-a-number'
    }).then(done)
      .catch(err => {
        expect(err).to.be.an('Error')

        done()
      })
  })

  it('should list the recent torrents', done => {
    eztv.getTorrents().then(res => {
      testOutputAttributes(res)
      done()
    }).catch(done)
  })

  it('should throw an error when a request is not valid', done => {
    const temp = eztv.config
    eztv.config = {
      host: 'somefaultyhost.com',
      path: '/somefaultypath.php?'
    }

    eztv.getTorrents({
      imdb_id: 4574334
    }).then(done)
      .catch(err => {
        expect(err).to.be.an('Error')

        eztv.config = temp
        done()
      })
  })
})
