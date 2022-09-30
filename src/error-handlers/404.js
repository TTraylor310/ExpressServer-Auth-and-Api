'use strict';
module.exports = function (req, res, next) {
  const errorObject = {
    status: 404,
    route: req.baseUrl,
    message: 'Not Found',
  };
  res.status(404).json(errorObject);
};
