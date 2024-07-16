const express = require('express')
const router = express.Router()
const db = require('../database')
const isLoggedInCheck = require('./auth').isLoggedIn

router.get('/all', isLoggedInCheck, async (req, res) => {
    try {
        const listData = await db.Travel.find()
        const allData = {
            list: listData,
            lastconnect: req.user.lastconnect
        }
        return res.send(allData)
    } catch (error) {
        return res.status(501).send(error.message)
    }
})

router.get('/my-all', isLoggedInCheck, async (req, res) => {
    try {
        const listData = await db.Travel.find({ _iduser: req.user._id })
        const allData = {
            list: listData,
            lastconnect: req.user.lastconnect,
            nickname: req.user.nickname,
            username: req.user.username,
            date: req.user.date,
            lastconnect: req.user.lastconnect,
            email: req.user.email
        }
        return res.send(allData)
    } catch (error) {
        return res.status(501).send(error.message)
    }
})

router.post('/addedit', isLoggedInCheck, async (req, res) => {
    let markerId = req.body.editmarker;
    let { editmarker, ...travel } = req.body
    if (markerId == "www") {
        travel = { ...travel, _iduser: req.user._id, createdate: new Date() }
    }
    console.log(travel, markerId)
    try {
        if (markerId == "www") {
            const newTravel = new db.Travel(travel)
            const addTravel = await newTravel.save()
            return res.status(200).send(addTravel)
        } else {
            const editTravel = await db.Travel.findByIdAndUpdate(editmarker, travel, { new: true})
            return res.status(200).send(editTravel)
        }
    } catch (error) {
        return res.status(501).send(error.message)
    }
})

router.post('/delete', isLoggedInCheck, async (req, res) => {
    let markerId = req.body.id;
    try {
        const deleteUser = await db.Travel.findByIdAndDelete(markerId)
        return res.send({ message: 'Trip Description Deleted' })
    } catch (error) {
        return res.status(501).send(error.message)
    }
})

router.get('/get/:id', isLoggedInCheck, async (req, res) => {
    try {
        const recipeData = await db.Travel.findById(req.params.id)
        const allData = {
            travel: recipeData,
            userid: req.user._id,
            usernickname: req.user.nickname,
        }
        return res.send(allData)
    } catch (error) {
        return res.status(501).send(error.message)
    }
})

module.exports = {
    router
}