const express = require('express')
const router = express.Router()
const db = require('../database')
const isLoggedInCheck = require('./auth').isLoggedIn

// POST http://localhost:8700/comments/alllist
router.post('/alllist', isLoggedInCheck, async (req, res) => {
    let travelsid = req.body.id
    try {
        const commentData = await db.Comment.find({ _idtravel: travelsid })
        return res.send(commentData)
    } catch (error) {
        return res.status(501).send(error.message)
    }
})

// POST http://localhost:8700/comments/add
router.post('/add', isLoggedInCheck, async (req, res) => {
    let commentData = req.body
    if (commentData.editmarker == "www") {
        commentData.date = new Date();
    }
    try {
        if (commentData.editmarker == "www") {
            const newComment = new db.Comment(commentData)
            await newComment.save()
            return res.status(200).send(newComment)
        } else {
            const editComment = await db.Comment.findByIdAndUpdate(commentData.editmarker, {comment: commentData.comment}, { new: true})
            return res.status(200).send(editComment)
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = {
    router
}