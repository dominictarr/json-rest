
var request = require('request')
  , u = require('ubelt')

module.exports = function jsonRest (defaults) {
//  var _request = request.defaults(defaults)
  return function (opts, callback) {
    opts = u.deepMerge(defaults, opts)
    if(opts.path) {
      opts.url = opts.url + (opts.path ? opts.path : '')
    }
    if(opts.auth) {
      opts.headers = opts.headers || {}
      opts.headers['Authorization'] = 'Basic ' + new Buffer(opts.auth).toString('base64')  
    }
    console.error(opts.method || 'GET', opts.url)
    return request(opts, function (err, res, body) {

      if(err) return callback (err)
      if('object' == typeof body) 
        return callback(res.statusCode >= 400 ? body : err, body)
      var json
      try { json = JSON.parse(body) } catch (_err) { return callback(_err, body) }
      callback(res.statusCode >= 400 ? json: err, json)
    })
  }
}