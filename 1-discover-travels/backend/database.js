const mongoose = require('mongoose');


if (!process.env.MONGO) {
    throw new Error('MONGO environment variable is not set')
}

mongoose.connect(process.env.MONGO)

const db = mongoose.connection
db.on('error', () => console.log('Failed to connect to MongoDB'))
db.once('open', () => console.log('Connect to MongoDB'))

const travelSchema = new mongoose.Schema({
        _iduser: { type: String, require: true },
        name: { type: String, require: true },
        shortdescription: String,
        country: String,
        description: String,
        travelagency: String,
        ratingagency: Number,
        image: String,
        date: Date,
        createdate: Date
})
const Travel = mongoose.model('Travel', travelSchema)

const commentSchema = new mongoose.Schema({
    _idtravel: { type: String, require: true },
    _idrescomment: { type: String, require: true },
    _iduser: { type: String, require: true },
    nickname: { type: String, require: true },    
    comment: String,
    date: Date,
    editmarker: String
})
const Comment = mongoose.model('Comment', commentSchema)

const userSchema = new mongoose.Schema({
    nickname: { type: String, require: true, unique: true },
    username: String,
    password: { type: String, require: true },
    email:  { type: String, require: true, unique: true },
    date: Date,
    lastconnect: Date,
    secondconnect: Date
})
const User = mongoose.model('User', userSchema)

module.exports = {
    db,
    Travel,
    Comment,
    User
}