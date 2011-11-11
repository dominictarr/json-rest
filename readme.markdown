#json-rest

make json-rest requests just a little bit more convenient, than request, which is too general purpose.

## Example

``` js 
// set defaults

var jrest = require('json-rest'
var req = jrest({
  url: "http://whatever.com",
  auth: "user:password" // will set the auth header for you
}) 

req({path: '/extends/the/default/url'}, function (err, data) {
  if(err) throw err
  console.error(data) //data is parsed for you.
})

```

that is it.