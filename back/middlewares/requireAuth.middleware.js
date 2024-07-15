const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')
const config = require('../config')
const asyncLocalStorage = require('../services/als.service')

function requireAuth(req, res, next) {
  const { loggedinUser } = asyncLocalStorage.getStore()

  if (config.isGuestMode && !loggedinUser) {
    req.loggedinUser = { _id: '', fullname: 'Guest' }
    return next()
  }
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  next()
}

// module.exports = requireAuth

module.exports = {
  requireAuth,
}
