const express = require('express')
const { getEmails, getEmailById, addEmail, updateEmail, removeEmail } = require('./email.controller')
const { log } = require('../../middlewares/logger.middleware')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const router = express.Router()

router.get('/', log, getEmails)
router.get('/:id', getEmailById)
router.post('/', requireAuth, addEmail)
router.put('/:id', updateEmail)
router.delete('/:id', removeEmail)

module.exports = router