const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('email')
        var emails = await collection.find(criteria).sort({ subject: 1 }).toArray()
        return emails
    } catch (err) {
        logger.error('cannot find emails', err)
        throw err
    }
}

async function getById(emailId) {
    try {
        const collection = await dbService.getCollection('email')
        const email = collection.findOne({ _id: ObjectId.createFromHexString(emailId) })
        return email
    } catch (err) {
        logger.error(`while finding email ${emailId}`, err)
        throw err
    }
}

async function remove(emailId) {
    try {
        const collection = await dbService.getCollection('email')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(emailId) })
        return emailId
    } catch (err) {
        logger.error(`cannot remove email ${emailId}`, err)
        throw err
    }
}

async function add(email) {
    try {
        const collection = await dbService.getCollection('email')
        await collection.insertOne(email)
        return email
    } catch (err) {
        logger.error('cannot insert email', err)
        throw err
    }
}

async function update(email) {
    try {
        const emailToSave = { ...email }
        delete emailToSave._id
        const collection = await dbService.getCollection('email')
        await collection.updateOne({ _id: ObjectId.createFromHexString(email._id) }, { $set: emailToSave })
        return email
    } catch (err) {
        logger.error(`cannot update email ${email._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.subject) criteria.subject = { $regex: filterBy.subject, $options: 'i' }
    if (filterBy.status) criteria.status = filterBy.status
    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
