var crypto = require('crypto')

var sha256 = crypto.createHash('sha256').update('de').digest('hex');

console.log(sha256);