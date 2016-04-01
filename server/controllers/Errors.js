
const HttpError = function HttpError(statusCode, message) {
  this.name = 'HttpError';
  this.message = message || 'Unknown Server Error';
  this.status = statusCode || '500';
};
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

const defaultErrorHandler = function defaultErrorHandler(err, req, res, next) {
  console.error('Error>>>>>>>>>', err);
  if (err instanceof HttpError) {
    return res.status(err.status).send(err.message);
  }
  return res.status(500).send('Unknown Server Error.');
};

module.exports = {
  HttpError,
  defaultErrorHandler,
};
