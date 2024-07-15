const emailService = require('./email.service.js')
const logger = require('../../services/logger.service.js')

async function getEmails(req, res) {
    try {
        logger.debug('Fetching emails')
        const filterBy = {
            subject: req.body.subject || ''
        }
        const emails = await emailService.query(filterBy)
        res.json(emails)
    } catch (err) {
        logger.error('Failed to get emails', err)
        res.status(500).send({ err: 'Failed to get emails' })
    }
}

async function getEmailById(req, res) {
    try {
        const emailId = req.params.id
        const email = await emailService.getById(emailId)
        res.json(email)
    } catch (err) {
        logger.error('Failed to get email', err)
        res.status(500).send({ err: 'Failed to get email' })
    }
}

async function addEmail(req, res) {
    try {
        const email = req.body
        const addedEmail = await emailService.add(email)
        res.json(addedEmail)
    } catch (err) {
        logger.error('Failed to add email', err)
        res.status(500).send({ err: 'Failed to add email' })
    }
}

async function updateEmail(req, res) {
    try {
        const email = req.body
        const updatedEmail = await emailService.update(email)
        res.json(updatedEmail)
    } catch (err) {
        logger.error('Failed to update email', err)
        res.status(500).send({ err: 'Failed to update email' })
    }
}

async function removeEmail(req, res) {
    try {
        const emailId = req.params.id
        const removedId = await emailService.remove(emailId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove email', err)
        res.status(500).send({ err: 'Failed to remove email' })
    }
}

module.exports = {
    getEmails,
    getEmailById,
    addEmail,
    updateEmail,
    removeEmail,
}