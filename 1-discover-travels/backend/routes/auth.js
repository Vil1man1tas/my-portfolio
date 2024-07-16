const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../database')

router.post('/register', async (req, res) => {
    const { nickname, email, password } = req.body
    if (!nickname || !email || !password) {
        return res.status(400).send({ message: 'Fields: Email, nickname and password are required.' })
    }

    try {
        let usersIn = await db.User.find({ email: email })
        if (usersIn.length > 0) {
            return res.status(400).send({ message: 'This email address already exists.' })
        }
        usersIn = await db.User.find({ nickname: nickname })
        if (usersIn.length > 0) {
            return res.status(400).send({ message: 'This nickname is already in use.' })
        }
        const hashedPassword = await bcrypt.hash(password, 8)
        let userData = { ...req.body }
        userData.password = hashedPassword
        userData.date = new Date();
        userData.lastconnect = new Date();
        userData.secondconnect = new Date();
        const newUser = new db.User(userData)
        await newUser.save()
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        return res.status(201).send({
            message: 'User Registered.',
            token: token,
            expiresIn: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
            user: {
                id: newUser._id,
                nickname: newUser.nickname,
                lastconnect: newUser.lastconnect
            }
        })
    } catch (error) {
        return res.status(500).send({ message: 'User Registration Failed.' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required.' })
    }
    try {
        const user = await db.User.findOne({ email: email})
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send({ message: 'Incorrect User Data Entered' })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        user.lastconnect = user.secondconnect
        let newUser = await db.User.findByIdAndUpdate(user._id, {lastconnect: user.lastconnect})
        user.secondconnect = new Date()
        newUser = await db.User.findByIdAndUpdate(user._id, {secondconnect: user.secondconnect} , { new: true })
        return res.status(200).send({
            message: 'User Connected',
            token: token,
            user: {
                id: user._id,
                nickname: user.nickname,
                lastconnect: user.lastconnect
            }
        })
    } catch (error) {
        return res.status(500).send({ message: 'Failed to Register User' })
    }
})

// ============================================================
const isLoggedIn = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Information Accessible Only When Logged In.' })
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).send({ message: 'Information Accessible Only When Logged In.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await db.User.findById(decoded.id)
        req.user = user

    } catch (error) {
        return res.status(401).send({ message: 'Invalid Login Token.' })
    }

    next() 
}

router.get('/nickname', isLoggedIn, async (req, res) => {
    try {
        const nickname = req.user.nickname; 
        return res.send(nickname)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.put('/edit', isLoggedIn, async (req, res) => {
    const { nickname, email, password, username } = req.body
    try {
        let orChange = false
        let oldData = {
            nickname: req.user.nickname,
            username: req.user.username,
            email: req.user.email,
            password: req.user.password
        }
        if (nickname != req.user.nickname) {
            let usersIn = await db.User.find({ nickname: nickname })
            if (usersIn.length > 0) {
                return res.status(400).send({ message: 'This nickname is already in use.' })
            } 
            orChange = true;
            oldData.nickname = nickname;           
        }
        if (email != req.user.email) {
            let usersIn = await db.User.find({ email: email })
            if (usersIn.length > 0) {
                return res.status(400).send({ message: 'This email is already in use.' })
            }
            orChange = true;
            oldData.email = email;           
        }
        if (username != req.user.username) {
            orChange = true;
            oldData.username = username; 
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 8)
            orChange = true;
            oldData.password = hashedPassword; 
        }

        if (!orChange) {return res.status(400).send({ message: 'Data Not Changed' })}

        const newData = await db.User.findByIdAndUpdate(req.user._id, oldData, { new: true})
        return res.status(200).send(newData)

    } catch (error) {
        return res.status(500).send({ message: 'Failed to Update User Data' })
    }
})

router.delete('/delete', isLoggedIn, async (req, res) => {
    try {
        const deleteUser = await db.User.findByIdAndDelete(req.user._id)
        return res.send({ message: 'Account "' + deleteUser.nickname + '" deleted' })
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = {
    router,
    isLoggedIn
}