const passport = require('passport')
const blogpostRouter = require('express').Router()
const Blogpost = require('../controllers/post.controller')

blogpostRouter.get('/post', Blogpost.getPost)
blogpostRouter.post('/newpost', Blogpost.newPost)

module.exports = blogpostRouter