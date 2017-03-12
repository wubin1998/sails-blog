
module.exports = function(val){
  var md5 = require('crypto').createHash('md5');
  return md5.update(val).digest('hex');
}