const passport = require('passport');
const blogpostRouter = require('express').Router();
const Blogpost = require('../controllers/post.controller');

blogpostRouter.get('/getpost', Blogpost.getPost);
blogpostRouter.post('/newpost', Blogpost.newPost);
blogpostRouter.delete('/:id', Blogpost.deletePost);
blogpostRouter.put('/:id', Blogpost.updatePost);

module.exports = blogpostRouter;