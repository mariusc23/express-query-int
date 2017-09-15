var parseNums = require('./lib/parse');

module.exports = function(options) {
  options = options || {
    parser: Number
  };

  return function(req, res, next) {
    req.query = parseNums(req.query, options);
    next();
  };
};
