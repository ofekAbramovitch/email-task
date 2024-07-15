const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = new ObjectId(user._id).getTimestamp()
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}


async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: new ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}
async function getByEmail(email) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        logger.error(`while finding user by email: ${email}`, err)
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            _id: ObjectId(user._id),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        delete userToSave.password
        return userToSave
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const userToAdd = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                email: txtCriteria
            },
            {
                firstName: txtCriteria
            },
            {
                lastName: txtCriteria
            }
        ]
    }
    return criteria
}




