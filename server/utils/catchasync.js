/**
 * Catch All errors for the wrapped function
 * @param {Function} fn a controller function
 * @returns {(req: Request, res: Resposnse, next: Function) => None}
 */
const catchAsync = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => next(error))
  }
}

module.exports = catchAsync
