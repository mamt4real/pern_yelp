class NotFound extends Error {
  constructor(message) {
    super(message)
    this.status = 404
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class UnAuthorized extends Error {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message)
    this.status = 403
  }
}

module.exports = {
  NotFound,
  BadRequest,
  Forbidden,
  UnAuthorized,
}
