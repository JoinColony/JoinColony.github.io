const crypto = require('crypto')

exports.getContentDigest = content =>
  crypto
    .createHash('md5')
    .update(content)
    .digest('hex')
